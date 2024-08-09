import { z } from "zod";
import { isEmail, isUsername, isPassword } from "@CommonTypes/profile.type";
import { SignupResponseDTO } from "./signup.dto";
import { strings } from "resources/strings";

export const signinRequestDTO = z.object({
  identifier: z.union([
    z.string().refine(isEmail, strings.INVALID_EMAIL_ERROR),
    z.string().refine(isUsername, strings.INVALID_USERNAME_ERROR),
  ]),
  password: z.string().refine(isPassword, strings.INVALID_PASSWORD_ERROR),
});

export type SigninRequestDTO = z.infer<typeof signinRequestDTO>;
export type SigninResponseDTO = SignupResponseDTO;
