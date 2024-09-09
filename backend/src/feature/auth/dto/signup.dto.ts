import { z } from "zod";
import { isEmail, isUsername, isPassword } from "@CommonTypes/profile.type";
import { strings } from "resources/strings";

export const signupRequestDTO = z.object({
  username: z
    .string()
    .trim()
    .refine(isUsername, strings.INVALID_USERNAME_ERROR),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine(isEmail, strings.INVALID_EMAIL_ERROR),
  password: z.string().refine(isPassword, strings.INVALID_PASSWORD_ERROR),
  confirmPassword: z
    .string()
    .refine(isPassword, strings.INVALID_PASSWORD_ERROR),
});

export type SignupRequestDTO = z.infer<typeof signupRequestDTO>;
export type SignupResponseDTO = { accessToken: string };
