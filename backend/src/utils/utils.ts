import { appConfig } from "config";

export function convertFileNameToURL(
  name: string,
  type: "post" | "profile"
): string {
  const path =
    type === "post"
      ? appConfig.STORAGE_POST_PATH
      : appConfig.STORAGE_PROFILE_PATH;
  return `${appConfig.CDN_BASE_URL}:${appConfig.CDN_PORT}${appConfig.CDN_ROOT}${path}/${name}`;
}
