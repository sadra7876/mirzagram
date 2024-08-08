import { z } from "zod";
import { isEmail, isUsername, isPassword } from "@CommonTypes/profile.type";
import { Branded } from "@utils/type-branding";

export const signinDTO = z.object({
  identifier: z.union([
    z.string().refine(isEmail, { message: "Invalid email" }),
    z.string().refine(isUsername, { message: "Invalid username" }),
  ]),
  password: z.string().refine(isPassword, { message: "Invalid password" }),
});

export type SigninDTO = z.infer<typeof signinDTO>;
