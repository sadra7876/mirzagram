import { strings } from "resources/strings";
import { z } from "zod";

export const postLikeRequestDTO = z.object({
  postId: z.string().min(1, strings.POST_ID_CANNOT_BE_EMPTY_ERROR),
});

export type PostLikeRequestDTO = z.infer<typeof postLikeRequestDTO>;
