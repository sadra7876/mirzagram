import { Email, Username, isEmail } from "@CommonTypes/profile.type";
import { isValidEmail } from "@utils/type-checking";
import { ClientError, ServerError } from "@utils/http-error";
import { Profile } from "../../profile/repository/profile.entity";
import { IProfileRepository } from "../../profile/repository/profile.repo";
import {
  ForgotPassword,
  ResetPassword,
  SigninRequestDTO,
  SigninResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
} from "../dto";
import {
  verifyPassword,
  hashPassword,
  passwordMatch,
} from "../utils/password.utils";
import crypto from "crypto";
// import dotenv from "dotenv-flow";
import { transporter } from "../../../dependencies";
import { MailerService } from "feature/mailer/service/mailer.service";
import { ForgetPasswordToken } from "../repository/token.entity";
import { ITokenRepository } from "../repository/token.repo";
import { generateAccessToken } from "../utils/jwt.utils";
import { strings } from "resources/strings";
// import { env } from "process";
import { appConfig } from "config";

// dotenv.config();

interface Dependencies {
  tokenRepo: ITokenRepository;
  profileRepo: IProfileRepository;
  mailerService: MailerService;
}

export class AuthService {
  constructor(private readonly deps: Dependencies) {}

  async signup(signupDTO: SignupRequestDTO): Promise<SignupResponseDTO> {
    await this.handleUserCheck(signupDTO.email, signupDTO.username);

    if (!passwordMatch(signupDTO.password, signupDTO.confirmPassword)) {
      throw new ClientError(strings.PASSWORDS_DO_NOT_MATCH_ERROR);
    }

    try {
      const user = await this.createUser(signupDTO);
      const jwt = generateAccessToken(user.id);
      return { accessToken: jwt };
    } catch (e) {
      console.error(e);
      throw new ServerError();
    }
  }

  async signin(signinDTO: SigninRequestDTO): Promise<SigninResponseDTO> {
    let user;
    if (isEmail(signinDTO.identifier)) {
      user = await this.deps.profileRepo.getByEmail(
        signinDTO.identifier as Email
      );
    } else {
      user = await this.deps.profileRepo.getByUsername(
        signinDTO.identifier as Username
      );
    }

    if (!user || !(await verifyPassword(signinDTO.password, user.password))) {
      throw new ClientError(strings.INVALID_USERNAME_OR_PASSWORD_ERROR);
    }

    const jwt = generateAccessToken(user.id);
    return { accessToken: jwt };
  }

  async sendPasswordResetEmail(
    forgotPasswordDTO: ForgotPassword
  ): Promise<void> {
    if (!isValidEmail(forgotPasswordDTO.email)) {
      throw new ClientError(strings.INVALID_EMAIL_ERROR);
    }

    const user = await this.deps.profileRepo.getByEmail(
      forgotPasswordDTO.email
    );
    if (!user) {
      throw new ClientError(strings.INVALID_USERNAME_ERROR);
    }
    try {
      const newAccessToken = await this.handleTokenCreation(user);
      this.deps.mailerService.sendResetPasswordEmail(
        user.email,
        user.username,
        `${appConfig.CLIENT_BASE_URL}:${appConfig.CLIENT_PORT}${appConfig.CLIENT_ROOT}/${appConfig.RESET_PASSWORD_ROUTE}?token=${newAccessToken.resetPasswordToken}`
      );
      return;
    } catch {
      throw new ServerError();
    }
  }

  async resetPassword(resetPasswordDTO: ResetPassword): Promise<void> {
    const tokenData = await this.deps.tokenRepo.getByToken(
      resetPasswordDTO.token
    );
    if (!tokenData) {
      throw new ClientError(strings.INVALID_USERNAME_ERROR);
    }
    if (tokenData.expired) {
      throw new ClientError(strings.RESET_PASSWORD_TOKEN_EXPIRED_ERROR);
    }

    if (tokenData.expirationDate < new Date()) {
      await this.deps.tokenRepo.expireToken(tokenData);
      throw new ClientError(strings.RESET_PASSWORD_TOKEN_EXPIRED_ERROR);
    }

    if (
      !passwordMatch(
        resetPasswordDTO.password,
        resetPasswordDTO.confirmPassword
      )
    ) {
      throw new ClientError(strings.PASSWORDS_DO_NOT_MATCH_ERROR);
    }

    try {
      const hashedPassword = await hashPassword(resetPasswordDTO.password);
      const userToUpdate = await this.deps.profileRepo.getByEmail(
        tokenData.profileEmail
      );
      if (!userToUpdate) throw new ClientError(strings.INVALID_USERNAME_ERROR);
      await this.deps.profileRepo.createOrUpdate({
        ...userToUpdate,
        password: hashedPassword,
      });
      await this.deps.tokenRepo.expireToken(tokenData);
      return;
    } catch (e) {
      console.error(e); //FIXME - add logging
      throw new ServerError();
    }
  }

  private async handleUserCheck(email: Email, username: Username) {
    const emailExists = await this.deps.profileRepo.getByEmail(email);
    if (emailExists) {
      throw new ClientError(strings.EMAIL_ALREADY_EXISTS_ERROR);
    }

    const usernameExists = await this.deps.profileRepo.getByUsername(username);
    if (usernameExists) {
      throw new ClientError(strings.USERNAME_ALREADY_EXISTS_ERROR);
    }
  }

  private async createUser(signupDTO: SignupRequestDTO): Promise<Profile> {
    const newUserAuth = new Profile();
    newUserAuth.username = signupDTO.username;
    newUserAuth.email = signupDTO.email;
    newUserAuth.password = await hashPassword(signupDTO.password);
    newUserAuth.createdAt = new Date(); // check this in entity
    return this.deps.profileRepo.createOrUpdate(newUserAuth);
  }

  private async handleTokenCreation(user: Profile) {
    //FIXME - change this later, add timer and more checks i guess
    const resetToken = crypto.randomBytes(20).toString("hex");
    const newAccessToken = new ForgetPasswordToken();

    newAccessToken.resetPasswordToken = resetToken;
    newAccessToken.expirationDate = new Date(Date.now() + 3600000);
    newAccessToken.profileEmail = user.email;
    return this.deps.tokenRepo.createOrUpdate(newAccessToken);
  }
}
