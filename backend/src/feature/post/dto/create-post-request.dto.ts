import { strings } from "resources/strings";
const sanitizeHtml = require("sanitize-html");
import { z } from "zod";

export const createPostRequestDTO = z.object({
  fileNames: z
    .array(z.string().min(1, strings.FILE_NAME_EMPTY_ERROR))
    .nonempty(strings.POST_MUST_HAVE_PHOTO_ERROR),
  caption: z
    .string()
    .max(300, strings.INPUT_TOO_LONG_ERROR(strings.CAPTION, 300))
    .trim()
    .nullish()
    .transform((v) => v && (sanitizeHtml(v) as string)),
  mentions: z.array(z.string().min(1, strings.MENTION_EMPTY_ERROR)).nullish(),
});

export type CreatePostRequestDTO = z.infer<typeof createPostRequestDTO>;
