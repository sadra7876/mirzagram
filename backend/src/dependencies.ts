import { DataSource } from "typeorm";
import { Profile } from "./feature/profile/repository/profile.entity";
import { ProfileRepository } from "./feature/profile/repository/profile.repo";
import { AuthService } from "./feature/auth/service/auth.service";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pass",
  database: "mirzaGram-db",
  synchronize: true,
  logging: true,
  entities: [Profile],
  subscribers: [],
  migrations: [],
});

const userProfileRepository = new ProfileRepository(AppDataSource);

export const authService = new AuthService(userProfileRepository);
