import { isEmail, isPassword } from "@CommonTypes/profile.type";
import { z } from "zod";

export const profileDTO = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().refine(isEmail, { message: "Invalid email" }),
  password: z.string().refine(isPassword, { message: "Invalid password" }),
  confirmPassword: z
    .string()
    .refine(isPassword, { message: "Invalid password" }),
  isPrivate: z.boolean(),
  bio: z.string(),
});

export type profileDTO = z.infer<typeof profileDTO>;
