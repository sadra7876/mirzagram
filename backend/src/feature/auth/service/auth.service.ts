import { Email, Password, Username, isEmail } from "@CommonTypes/profile.type";
import { isValidEmail } from "@utils/type-checking";
import { HttpError } from "@utils/http-error";
import { Profile } from "../../profile/repository/profile.entity";
import { IProfileRepository } from "../../profile/repository/profile.repo";
import { ForgotPassword, ResetPassword, SigninRequestDTO, SigninResponseDTO, SignupRequestDTO, SignupResponseDTO, signupRequestDTO } from "../dto";
import {
  verifyPassword,
  hashPassword,
  passwordMatch,
} from "../utils/password.utils";
import crypto from "crypto";
import dotenv from "dotenv-flow";
import { transporter } from "../../../dependencies";
import { MailerService } from "feature/mailer/service/mailer.service";
import { ForgetPasswordToken } from "../repository/token.entity";
import { ITokenRepository } from "../repository/token.repo";
import { generateAccessToken } from "../utils/jwt.utils";
import { strings } from "resources/strings";

dotenv.config();

interface dependencies {
  tokenRepo: ITokenRepository;
  profileRepo: IProfileRepository;
}

export class AuthService {

  constructor(private readonly deps: dependencies) {}

  async signup(signupDTO: SignupRequestDTO): Promise<SignupResponseDTO> {
    if (!passwordMatch(signupDTO.password, signupDTO.confirmPassword)) {
      throw new HttpError(400, strings.PASSWORDS_DO_NOT_MATCH_ERROR);
    }

    await this.handleUserCheck(signupDTO.email, signupDTO.username);

    try {
      const user = await this.createUser(signupDTO);
      const jwt = generateAccessToken(user.id);
      return { accessToken: jwt };
    } catch (e) {
      throw new HttpError(500, strings.INTERNAL_SERVER_ERROR);
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
      throw new HttpError(400, strings.INVALID_USERNAME_OR_PASSWORD_ERROR);
    }

    const jwt = generateAccessToken(user.id);
    return { accessToken: jwt };
  }

  async sendPasswordResetEmail(
    forgotPasswordDTO: ForgotPassword
  ): Promise<void> {
    if (!isValidEmail(forgotPasswordDTO.email)) {
      throw new HttpError(400, strings.INVALID_EMAIL_ERROR);
    }

    const user = await this.deps.profileRepo.getByEmail(
      forgotPasswordDTO.email
    );
    if (!user) {
      throw new HttpError(404, strings.INVALID_USERNAME_ERROR);
    }
    try {
      const newAccessToken = await this.handleTokenCreation(user);
      const mailer = new MailerService(transporter);

      mailer.sendResetPasswordEmail(
        user.email,
        user.username,
        `yousef/${newAccessToken.resetPasswordToken}`
      );
      return;
    } catch (e) {
      throw new HttpError(500, strings.INTERNAL_SERVER_ERROR);
    }
  }

  async resetPassword(
    resetPasswordDTO: ResetPassword
  ): Promise<void> {
    const tokenData = await this.deps.tokenRepo.getByToken(
      resetPasswordDTO.token
    );
    if (!tokenData) {
      throw new HttpError(404, strings.INVALID_USERNAME_ERROR);
    }
    if (tokenData.expired) {
      throw new HttpError(400, strings.RESET_PASSWORD_TOKEN_EXPIRED_ERROR);
    }

    if (tokenData.expirationDate < new Date()) {
      await this.deps.tokenRepo.expireToken(tokenData);
      throw new HttpError(400, strings.RESET_PASSWORD_TOKEN_EXPIRED_ERROR);
    }

    if (
      !passwordMatch(
        resetPasswordDTO.password,
        resetPasswordDTO.confirmPassword
      )
    ) {
      throw new HttpError(400, strings.PASSWORDS_DO_NOT_MATCH_ERROR);
    }

    try {
      const hashedPassword = await hashPassword(resetPasswordDTO.password);
      const userToUpdate = await this.deps.profileRepo.getByEmail(
        tokenData.profileEmail
      );
      if (!userToUpdate) throw new HttpError(404, strings.INVALID_USERNAME_ERROR);
      await this.deps.profileRepo.createOrUpdate({
        ...userToUpdate,
        password: hashedPassword,
      });
      await this.deps.tokenRepo.expireToken(tokenData);
      return;
    } catch (error) {
      throw new HttpError(500, strings.INTERNAL_SERVER_ERROR);
    }
  }

  private async handleUserCheck(email: Email, username: Username) {
    const emailExists = await this.deps.profileRepo.getByEmail(email);
    if (emailExists) {
      throw new HttpError(400, strings.EMAIL_ALREADY_EXISTS_ERROR);
    }

    const usernameExists = await this.deps.profileRepo.getByUsername(username);
    if (usernameExists) {
      throw new HttpError(400, strings.USERNAME_ALREADY_EXISTS_ERROR);
    }
  }

  private async createUser(signupDTO: SignupRequestDTO): Promise<Profile> {
    const newUserAuth = new Profile();
    newUserAuth.username = signupDTO.username;
    newUserAuth.email = signupDTO.email;
    newUserAuth.password = await hashPassword(signupDTO.password);
    newUserAuth.createdAt = new Date(); // check this in entity
    return await this.deps.profileRepo.createOrUpdate(newUserAuth);
  }

  private async handleTokenCreation(user: Profile) {
    //FIXME - change this later, add timer and more checks i guess
    const userToken = await this.deps.tokenRepo.getByProfileEmail(user.email);
    const resetToken = crypto.randomBytes(20).toString("hex");
    const newAccessToken = new ForgetPasswordToken();

    newAccessToken.resetPasswordToken = resetToken;
    newAccessToken.expirationDate = new Date(Date.now() + 3600000);
    newAccessToken.profileEmail = user.email;
    return await this.deps.tokenRepo.createOrUpdate(newAccessToken);
  }
}
