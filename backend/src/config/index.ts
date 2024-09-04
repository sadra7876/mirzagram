import { createLocalConfig } from "./envs/local";
import { createProdConfig } from "./envs/prod";
import { createStagingConfig } from "./envs/staging";

export const appConfig = getConfig();

console.log(process.env.DB_NAME);

function getConfig() {
  switch (process.env.APP_ENV) {
    case "staging":
      console.log(`Running on ${process.env.APP_ENV}`);
      return createStagingConfig();
    case "local":
      console.log(`Running on ${process.env.APP_ENV}`);
      return createLocalConfig();
    case "prod":
      console.log(`Running on ${process.env.APP_ENV}`);
      return createProdConfig();
    default:
      throw new Error(`Invalid APP_ENV "${process.env.APP_ENV}"`);
  }
}
