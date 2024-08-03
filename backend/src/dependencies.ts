import { DataSource } from "typeorm";
import { UserAuth } from "./feature/auth/respositories/user-auth.entity";
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
  entities: [UserAuth],
  subscribers: [],
  migrations: [],
});

export const authService = new AuthService();
