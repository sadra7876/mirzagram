import { z } from "zod";
import { isEmail, isUsername, isPassword } from "@CommonTypes/profile.type";
import { Branded } from "@utils/type-branding";
import { SignupResponseDTO } from "./signup.dto";

export const signinRequestDTO = z.object({
  identifier: z.union([
    z.string().refine(isEmail, { message: "Invalid email" }),
    z.string().refine(isUsername, { message: "Invalid username" }),
  ]),
  password: z.string().refine(isPassword, { message: "Invalid password" }),
});

export type SigninRequestDTO = z.infer<typeof signinRequestDTO>;
export type SigninResponseDTO = SignupResponseDTO;
