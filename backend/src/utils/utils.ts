import { env } from "process";

export function convertFileNameToURL(
  name: string,
  type: "post" | "profile"
): string {
  const path =
    type === "post" ? env.STORAGE_POST_PATH : env.STORAGE_PROFILE_PATH;
  return `${env.APP_BASE_URL}${path}${name}`;
}
