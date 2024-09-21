import { z } from "zod";

const expirationSchema = z.string().refine(
  (value) => {
    const regex =
      /^([1-9][0-9]*[smhdw]|([1-9][0-9]*[smhdw])?([1-9][0-9]*[smhdw])?)$/;
    return regex.test(value);
  },
  {
    message: "Invalid JWT expiration format",
  }
);
export const appConfigSchema = z.object({
  env: z.enum(["local", "staging", "prod"]),
  mocksEnabled: z.boolean().default(false),

  API_PORT: z.number(),
  API_BASE_URL: z.string(),
  API_ROOT: z.string(),
  SOCKET_PORT: z.string(),

  CDN_BASE_URL: z.string(),
  CDN_PORT: z.number(),
  CDN_ROOT: z.string(),
  STORAGE_POST_PATH: z.string(),
  STORAGE_PROFILE_PATH: z.string(),

  CLIENT_BASE_URL: z.string(),
  CLIENT_PORT: z.number(),
  CLIENT_ROOT: z.string(),

  DB_HOST: z.string(),
  DB_PORT: z.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  JWT_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRATION: expirationSchema,
  RESET_PASSWORD_EXPIRATION: expirationSchema,
  RESET_PASSWORD_ROUTE: z.string(),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.number(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

export type RequiredConfig = Optional<AppConfig, KeysWithFallbackValue>;

type KeysWithFallbackValue = "mocksEnabled";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
