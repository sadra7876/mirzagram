import { strings } from "resources/strings";
import { z } from "zod";

export const createCommentRequestDTO = z.object({
  postId: z.string().min(1, strings.POST_ID_CANNOT_BE_EMPTY_ERROR),
  text: z.string().min(1, strings.COMMENT_TEXT_CANNOT_BE_EMPTY_ERROR),
  parentCommentId: z
    .string()
    .min(1, strings.COMMENT_NOT_AVAILABLE_ERROR)
    .nullish(),
});

export const newReplyDTO = z.object({
  parentCommentId: z.string().min(1, strings.COMMENT_NOT_AVAILABLE_ERROR),
  text: z.string().min(1, strings.COMMENT_TEXT_CANNOT_BE_EMPTY_ERROR),
});

export type CreateCommentRequestDTO = z.infer<typeof createCommentRequestDTO>;
export type NewReplyDTO = z.infer<typeof newReplyDTO>;
