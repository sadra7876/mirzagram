import "reflect-metadata";
import { api } from "./api";
import { AppDataSource } from "./dependencies";
import dotenv from "dotenv-flow";
dotenv.config();

const MAX_RETRIES = 6; // Maximum number of retries
const RETRY_DELAY = 10000; // Delay between retries in milliseconds

async function initializeDatabaseWithRetry(
  retries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<void> {
  try {
    console.log(
      `Listening DB on http://${process.env.DB_HOST}:${process.env.DB_PORT}`
    );
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

api.listen(process.env.APP_PORT, () => {
  console.log(`Listening on ${process.env.APP_PORT}`);
});
