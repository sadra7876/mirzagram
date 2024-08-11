import { isEmail, isPassword, isUrl } from "@CommonTypes/profile.type";
import { url } from "inspector";
import { strings } from "resources/strings";
import { isValid, z } from "zod";

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
  profilePicture: z
    .string()
    .refine(isUrl, { message: strings.INVALID_URL_ERROR }),
});

export type profileDTO = z.infer<typeof profileDTO>;
