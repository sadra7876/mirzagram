import "reflect-metadata";
import { api } from "./api";
import { AppDataSource } from "./dependencies";
import dotenv from "dotenv-flow";
dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

api.listen(process.env.APP_PORT, () => {
  console.log(`Listening on ${process.env.APP_PORT}`);
});
