import { Branded } from "@utils/type-branding";
import { isValidEmail } from "@utils/type-checking";

export type ProfileId = Branded<number, "profileId">;
export function isProfileId(value: number): value is ProfileId {
  return value < 0; //FIXME - change this to uuid v7 later on
}

export type Username = Branded<string, "username">;
export function isUsername(value: string): value is Username {
  return value.length > 4;
}

export type Email = Branded<string, "email">;
export function isEmail(value: string): value is Email {
  return isValidEmail(value);
}

export type Password = Branded<string, "password">;
export function isPassword(value: string): value is Password {
  return value.length > 4;
}
