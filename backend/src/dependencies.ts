import { DataSource } from "typeorm";
import { UserAuth } from "./feature/auth/respositories/user-auth.entity";

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
