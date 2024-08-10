import { isEmail, isPassword } from "@CommonTypes/profile.type";
import { strings } from "resources/strings";
import { z } from "zod";

export const profileDTO = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().refine(isEmail, { message: strings.INVALID_EMAIL_ERROR }),
  password: z
    .string()
    .refine(isPassword, { message: strings.INVALID_PASSWORD_ERROR }),
  confirmPassword: z
    .string()
    .refine(isPassword, { message: strings.INVALID_PASSWORD_ERROR }),
  isPrivate: z.boolean(),
  bio: z.string(),
});

export type profileDTO = z.infer<typeof profileDTO>;
