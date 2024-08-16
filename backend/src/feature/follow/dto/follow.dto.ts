import { isUsername } from "@CommonTypes/profile.type";
import { strings } from "resources/strings";
import { z } from "zod";

export const followRequestDTO = z.object({
  followingUserName: z
    .string()
    .refine(isUsername, { message: strings.INVALID_USERNAME_ERROR }),
});

export type FollowRequestDTO = z.infer<typeof followRequestDTO>;
