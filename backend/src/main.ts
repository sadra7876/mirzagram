import "reflect-metadata";
import { AppDataSource } from "./dependencies";
import { api } from "./api";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

api.listen(3000, () => {
  console.log("Listening on 3000")
});
