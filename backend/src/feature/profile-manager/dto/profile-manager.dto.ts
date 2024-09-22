// import {
//   ProfileId,
//   isEmail,
//   isPassword,
//   isUsername,
// } from "@CommonTypes/profile.type";
import { Email, isUsername, Username } from "@CommonTypes/profile.type";
import { strings } from "resources/strings";
import { z } from "zod";
// import { Username, Email } from "../../../types/profile.type";

export const profileManagerRequestDTO = z.object({
  username: z
    .string()
    .refine(isUsername, { message: strings.INVALID_USERNAME_ERROR }),
});

export type ProfileManagerRequestDTO = z.infer<typeof profileManagerRequestDTO>;

export type ProfileManagerResponsDTO = {
  username: Username;
  email: Email;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  isPrivate: boolean;
  bio?: string;
  profilePicture?: string;
  createdAt: Date;
};
