import { z } from "zod";
import { isEmail, isUsername, isPassword } from "@CommonTypes/profile.type";

export const signupRequestDTO = z.object({
  username: z.string().refine(isUsername, { message: "Invalid username" }),
  email: z.string().refine(isEmail, { message: "Invalid email" }),
  password: z.string().refine(isPassword, { message: "Invalid password" }),
  confirmPassword: z
    .string()
    .refine(isPassword, { message: "Invalid password" }),
});

export type SignupRequestDTO = z.infer<typeof signupRequestDTO>;
export type SignupResponseDTO = { accessToken: string }
