import { z } from "zod";
import { isEmail, isPassword } from "@CommonTypes/profile.type";

export const forgotPasswordDTO = z.object({
  email: z.string().refine(isEmail, { message: "Invalid email" }),
});

export const resetPasswordDTO = z.object({
  token: z.string().min(1),
  password: z.string().refine(isPassword, { message: "Invalid password" }),
  confirmPassword: z
    .string()
    .refine(isPassword, { message: "Invalid password" }),
});

export type ForgotPassword = z.infer<typeof forgotPasswordDTO>;
export type ResetPassword = z.infer<typeof resetPasswordDTO>;
