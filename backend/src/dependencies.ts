import { DataSource } from "typeorm";
import { AuthService } from "./feature/auth/services/auth.service";
import { Profile } from "./feature/profile/repository/profile.entity";

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

export const authService = new AuthService();
