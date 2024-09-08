import "reflect-metadata";
import { api } from "./api";
import { AppDataSource } from "./dependencies";
import cors from "cors";
import express from "express";
import setupSwagger from "./swagger";
// import dotenv from "dotenv-flow";
// dotenv.config();

import { appConfig } from "config";
import path from "path";

const MAX_RETRIES = 6; // Maximum number of retries
const RETRY_DELAY = 10000; // Delay between retries in milliseconds

const app = express();
app.use(cors());
app.use(express.json());
app.use(appConfig.API_ROOT, api);
setupSwagger(app);
app.use(
  appConfig.CDN_ROOT,
  express.static(path.resolve(process.cwd(), "uploads"))
);

async function initializeDatabaseWithRetry(
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<void> {
  try {
    console.log(`Listening DB on ${appConfig.DB_HOST}:${appConfig.DB_PORT}`);
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    if (retries > 0) {
      console.error(
        `Error during Data Source initialization. Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      await initializeDatabaseWithRetry(retries - 1, delay);
    } else {
      console.error("Error during Data Source initialization", err);
      console.error("Max retries reached. Exiting application.");
      process.exit(1);
    }
  }
}

initializeDatabaseWithRetry();

app.listen(appConfig.API_PORT, () => {
  console.log(`Listening on ${appConfig.API_PORT}`);
});
