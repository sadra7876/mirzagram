import { Email, Password, Username, isEmail } from "@CommonTypes/profile.type";
import { isValidEmail } from "@utils/type-checking";
import { HttpError } from "@utils/http-error";
import { Profile } from "../../profile/repository/profile.entity";
import { IProfileRepository } from "../../profile/repository/profile.repo";
import { ForgotPassword, ResetPassword, SigninDTO, signupDTO } from "../dto";
import {
  verifyPassword,
  hashPassword,
  passwordMatch,
} from "../utils/password.utils";
import { JwtService } from "./jwt.service";

import crypto from "crypto";
import dotenv from "dotenv-flow";
import { transporter } from "../../../dependencies";
import { MailerService } from "feature/mailer/service/mailer.service";
import { ForgetPasswordToken } from "../repository/token.entity";
import { ITokenRepository } from "../repository/token.repo";

dotenv.config();

interface dependencies {
  tokenRepo: ITokenRepository;
  profileRepo: IProfileRepository;
}
export class AuthService {
  constructor(private readonly deps: dependencies) {}

  private async handleUserCheck(email: Email, username: Username) {
    const emailExists = await this.deps.profileRepo.getByEmail(email);
    if (emailExists) {
      throw new HttpError(400, "Email already exists");
    }

    const usernameExists = await this.deps.profileRepo.getByUsername(username);
    if (usernameExists) {
      throw new HttpError(400, "Username already exists");
    }
  }

  async createUser(signupDTO: signupDTO): Promise<Profile> {
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
    // if (userToken) {
    //   await this.deps.tokenRepo.deleteTokenByProfile(user);
    // }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const newAccessToken = new ForgetPasswordToken();

    newAccessToken.resetPasswordToken = resetToken;
    newAccessToken.expirationDate = new Date(Date.now() + 3600000);
    newAccessToken.profileEmail = user.email;
    return await this.deps.tokenRepo.createOrUpdate(newAccessToken);
  }

  async signup(signupDTO: signupDTO): Promise<{ msg: string; jwt: string }> {
    if (!passwordMatch(signupDTO.password, signupDTO.confirmPassword)) {
      throw new HttpError(400, "Passwords do not match");
    }

    await this.handleUserCheck(signupDTO.email, signupDTO.username);

    try {
      const user = await this.createUser(signupDTO);
      // const WelcomeEmail = new MailerService(transporter);
      // WelcomeEmail.sendWelcomeEmail(user.email, user.username);

      const jwtPayload = {
        subjectId: user.id,
        username: user.username,
      };
      const jwt = JwtService.createAccessToken(jwtPayload);
      console.log(jwt);
      return { msg: "User created successfully", jwt: jwt };
    } catch (e) {
      console.log(e);
      throw new HttpError(500, "Internal server error");
    }
  }

  async signin(signinDTO: SigninDTO): Promise<{ msg: string; jwt: string }> {
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
      throw new HttpError(400, "Username or password is wrong!");
    }

    const jwtPayload = {
      subjectId: user.id,
      username: user.username,
    };
    const jwt = JwtService.createAccessToken(jwtPayload);
    return { msg: "Signed in successfully", jwt: jwt };
  }

  async sendPasswordResetEmail(
    forgotPasswordDTO: ForgotPassword
  ): Promise<{ msg: string }> {
    if (!isValidEmail(forgotPasswordDTO.email)) {
      throw new HttpError(400, "Invalid email address");
    }

    const user = await this.deps.profileRepo.getByEmail(
      forgotPasswordDTO.email
    );
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    try {
      const newAccessToken = await this.handleTokenCreation(user);
      const mailer = new MailerService(transporter);

      // this.deps.tokenRepo.createOrUpdate(newAccessToken);
      mailer.sendResetPasswordEmail(
        user.email,
        user.username,
        `yousef/${newAccessToken.resetPasswordToken}`
      );
      return { msg: "Reset password link sent successfully" };
    } catch (e) {
      console.log(e);
      throw new HttpError(500, "Internal server error");
    }
  }

  async resetPassword(
    resetPasswordDTO: ResetPassword
  ): Promise<{ msg: string }> {
    const tokenData = await this.deps.tokenRepo.getByToken(
      resetPasswordDTO.token
    );
    console.log(tokenData, "tokenData");
    if (!tokenData) {
      throw new HttpError(404, "User not found");
    }
    if (tokenData.expired) {
      throw new HttpError(400, "Token expired");
    }

    if (tokenData.expirationDate < new Date()) {
      await this.deps.tokenRepo.expireToken(tokenData);
      throw new HttpError(400, "Token expired");
    }

    if (
      !passwordMatch(
        resetPasswordDTO.password,
        resetPasswordDTO.confirmPassword
      )
    ) {
      throw new HttpError(400, "Passwords do not match");
    }
    // console.log(tokenData.profile.username, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    try {
      // console.error(tokenData.profile);
      const hashedPassword = await hashPassword(resetPasswordDTO.password);
      const userToUpdate = await this.deps.profileRepo.getByEmail(
        tokenData.profileEmail
      );
      if (!userToUpdate) throw new HttpError(404, "User not found");
      await this.deps.profileRepo.createOrUpdate({
        ...userToUpdate,
        password: hashedPassword,
      });
      await this.deps.tokenRepo.expireToken(tokenData);
      return { msg: "Password reset successfully" };
    } catch (error) {
      throw new HttpError(500, "Internal server error");
    }
  }
}
