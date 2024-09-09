import { z } from "zod";
import { isEmail, isPassword } from "@CommonTypes/profile.type";
import { strings } from "resources/strings";

export const forgotPasswordDTO = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine(isEmail, strings.INVALID_EMAIL_ERROR),
});

export const resetPasswordDTO = z.object({
  token: z.string().min(1),
  password: z.string().refine(isPassword, strings.INVALID_PASSWORD_ERROR),
  confirmPassword: z
    .string()
    .refine(isPassword, strings.INVALID_PASSWORD_ERROR),
});

export type ForgotPassword = z.infer<typeof forgotPasswordDTO>;
export type ResetPassword = z.infer<typeof resetPasswordDTO>;
