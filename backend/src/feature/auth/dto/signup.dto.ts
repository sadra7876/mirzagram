import { z } from "zod";
// import { Branded } from "../../../../utils/type-branding";
import { isEmail, isUsername, isPassword } from "@CommonTypes/profile.type";

// export type Username = Branded<string, "username">;
// export function isUsername(value: string): value is Username {
//   return value.length > 5;
// }

// export type Email = Branded<string, "email">;
// export function isEmail(value: string): value is Email {
//   return isEmailUtil(value);
// }

// export type Password = Branded<string, "password">;
// export function isPassword(value: string): value is Password {
//   return /^[a-zA-Z]+$/.test(value) && value.length > 5;
// }

export const signupDTO = z.object({
  username: z.string().refine(isUsername, { message: "Invalid username" }),
  email: z.string().refine(isEmail, { message: "Invalid email" }),
  password: z.string().refine(isPassword, { message: "Invalid password" }),
  confirmPassword: z
    .string()
    .refine(isPassword, { message: "Invalid password" }),
});

export type signupDTO = z.infer<typeof signupDTO>;
