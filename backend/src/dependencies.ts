import { DataSource } from "typeorm";
import { AuthService } from "./feature/auth/services/auth.service";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pass",
  database: "mirzaGram-db",
  synchronize: true,
  logging: true,
  // entities: [Post, Category],
  subscribers: [],
  migrations: [],
});

export const authService = new AuthService();
