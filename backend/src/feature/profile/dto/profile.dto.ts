import {
  ProfileId,
  isEmail,
  isPassword,
  isUsername,
} from "@CommonTypes/profile.type";
import { strings } from "resources/strings";
import { z } from "zod";
import { Username, Email } from "../../../types/profile.type";

export const profileRequestDTO = z
  .object({
    firstName: z.string().min(1).optional().nullish(),
    lastName: z.string().min(1).optional().nullish(),
    email: z
      .string()
      .refine(isEmail, { message: strings.INVALID_EMAIL_ERROR })
      .optional()
      .nullish(),
    password: z
      .string()
      .refine(isPassword, { message: strings.INVALID_PASSWORD_ERROR })
      .optional()
      .nullish(),
    confirmPassword: z
      .string()
      .refine(isPassword, { message: strings.INVALID_PASSWORD_ERROR })
      .optional()
      .nullish(),
    isPrivate: z.boolean().optional().nullish(),
    bio: z.string().nullish(),
    profilePicture: z.string().optional().nullish(),
  })
  .refine(
    (date) => {
      if (date.password && !date.confirmPassword) {
        return false;
      }
      return true;
    },
    { message: strings.PASSWORDS_DO_NOT_MATCH_ERROR }
  );

export type ProfileResponseDTO = {
  id: ProfileId;
  username: Username;
  firstName?: string;
  lastName?: string;
  email: Email;
  isPrivate: boolean;
  bio?: string;
  profilePicture?: string;
  createdAt: Date;
  postCount: number;
  followerCount: number;
  followingCount: number;
};

export const exploreRequestDTO = z.object({
  username: z
    .string()
    .refine(isUsername, { message: strings.INVALID_USERNAME_ERROR }),
});

export type ExploreRequestDTO = z.infer<typeof exploreRequestDTO>;
export type ProfileRequestDTO = z.infer<typeof profileRequestDTO>;
