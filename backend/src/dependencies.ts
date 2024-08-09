import { DataSource } from "typeorm";
import nodemailer from "nodemailer";
import { Profile } from "feature/profile/repository/profile.entity";
import { AuthService } from "./feature/auth/service/auth.service";
import { ProfileService } from "./feature/profile/service/profile.service";
import { ProfileRepository } from "./feature/profile/repository/profile.repo";
import dotenv from "dotenv-flow";
import { TokenRepository } from "./feature/auth/repository/token.repo";
import { ForgetPasswordToken } from "feature/auth/repository/token.entity";
dotenv.config();

// DataSource
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Profile, ForgetPasswordToken],
  subscribers: [],
  migrations: [],
});

// Mailer service
export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // Set to true if using TLS
  auth: {
    user: "e417952c53db95",
    pass: "527a2f4dc9004d",
  },
});

// Repositories
const profileRepository = new ProfileRepository(AppDataSource);
const tokenRepository = new TokenRepository(AppDataSource);

// Services
export const authService = new AuthService({
  profileRepo: profileRepository,
  tokenRepo: tokenRepository,
});
export const profileService = new ProfileService({
  profileRepo: profileRepository,
});
