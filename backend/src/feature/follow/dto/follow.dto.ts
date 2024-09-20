import { Email, isUsername, Username } from "@CommonTypes/profile.type";
import { strings } from "resources/strings";
import { z } from "zod";

export const followRequestDTO = z.object({
  followingUserName: z
    .string()
    .refine(isUsername, { message: strings.INVALID_USERNAME_ERROR }),
});

export type FollowRequestDTO = z.infer<typeof followRequestDTO>;

export type FollowResponseDTO = {
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

export type FollowRequestResponseDTO = {
  username: Username;
  // email: Email;
  // firstName?: string;
  // lastName?: string;
  // isActive: boolean;
  // isPrivate: boolean;
  // bio?: string;
  // profilePicture?: string;
  // createdAt: Date;
};
