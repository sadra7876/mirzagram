// import {
//   ProfileId,
//   isEmail,
//   isPassword,
//   isUsername,
// } from "@CommonTypes/profile.type";
import { Email, isUsername, Username } from "@CommonTypes/profile.type";
import { z } from "zod";
// import { Username, Email } from "../../../types/profile.type";

export const profileManagerRequestDTO = z.object({
  username: z.string({ message: "Invalid UserId" }).min(1).refine(isUsername, {
    message: "Invalid UserId",
  }),
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
