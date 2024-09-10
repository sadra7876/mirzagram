import { strings } from "resources/strings";
import { z } from "zod";
const sanitizeHtml = require("sanitize-html");

export const createCommentRequestDTO = z.object({
  postId: z.string().min(1, strings.POST_ID_CANNOT_BE_EMPTY_ERROR),
  text: z
    .string()
    .min(1, strings.COMMENT_TEXT_CANNOT_BE_EMPTY_ERROR)
    .max(300, strings.INPUT_TOO_LONG_ERROR(strings.COMMENT, 300))
    .trim()
    .transform((v) => v && (sanitizeHtml(v) as string)),
  parentCommentId: z
    .string()
    .min(1, strings.COMMENT_NOT_AVAILABLE_ERROR)
    .nullish(),
});

export const newReplyDTO = z.object({
  parentCommentId: z.string().min(1, strings.COMMENT_NOT_AVAILABLE_ERROR),
  text: z
    .string()
    .min(1, strings.COMMENT_TEXT_CANNOT_BE_EMPTY_ERROR)
    .max(300, strings.INPUT_TOO_LONG_ERROR(strings.COMMENT, 300))
    .trim()
    .nullish()
    .transform((v) => v && (sanitizeHtml(v) as string)),
});

export type CreateCommentRequestDTO = z.infer<typeof createCommentRequestDTO>;
export type NewReplyDTO = z.infer<typeof newReplyDTO>;
