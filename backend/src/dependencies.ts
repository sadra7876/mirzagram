import { DataSource } from "typeorm";
import { Profile } from "./feature/profile/repository/profile.entity";
import { AuthService } from "./feature/auth/service/auth.service";
import { ProfileService } from "./feature/profile/service/profile.service";
import { ProfileRepository } from "./feature/profile/repository/profile.repo";
import dotenv from "dotenv-flow";
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
  entities: [Profile],
  subscribers: [],
  migrations: [],
});

// Repositories
const userProfileRepository = new ProfileRepository(AppDataSource);
const profileRepo = new ProfileRepository(AppDataSource);

// Services
export const authService = new AuthService(userProfileRepository);
export const profileService = new ProfileService(profileRepo);
