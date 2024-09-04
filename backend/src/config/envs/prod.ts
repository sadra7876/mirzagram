import { defineConfig } from "../defineConfig";

export function createProdConfig() {
  return defineConfig({
    env: "prod",
    mocksEnabled: true,

    API_BASE_URL: process.env.API_BASE_URL!,
    API_PORT: Number(process.env.API_PORT),
    API_ROOT: process.env.API_ROOT!,

    CDN_BASE_URL: process.env.CDN_BASE_URL!,
    CDN_PORT: Number(process.env.CDN_PORT),
    CDN_ROOT: process.env.CDN_ROOT!,
    STORAGE_POST_PATH: process.env.STORAGE_POST_PATH!,
    STORAGE_PROFILE_PATH: process.env.STORAGE_PROFILE_PATH!,

    CLIENT_BASE_URL: process.env.CLIENT_BASE_URL!,
    CLIENT_PORT: Number(process.env.CLIENT_PORT),
    CLIENT_ROOT: process.env.CLIENT_ROOT!,

    DB_HOST: process.env.DB_HOST!,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
    DB_NAME: process.env.DB_NAME!,

    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION!,
    RESET_PASSWORD_EXPIRATION: process.env.RESET_PASSWORD_EXPIRATION!,
    RESET_PASSWORD_ROUTE: process.env.RESET_PASSWORD_ROUTE!,

    SMTP_HOST: process.env.SMTP_HOST!,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_USERNAME: process.env.SMTP_USERNAME!,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
  });
}
