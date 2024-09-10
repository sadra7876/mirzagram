import { strings } from "resources/strings";
import { z } from "zod";
const sanitizeHtml = require("sanitize-html");

export const editPostRequestDTO = z.object({
  fileNames: z
    .array(z.string().min(1, strings.FILE_NAME_EMPTY_ERROR))
    .nullish(),
  caption: z
    .string()
    .max(300, strings.INPUT_TOO_LONG_ERROR(strings.CAPTION, 300))
    .trim()
    .nullish()
    .transform((v) => v && (sanitizeHtml(v) as string)),
  mentions: z.array(z.string().min(1, strings.MENTION_EMPTY_ERROR)).nullish(),
});

export type EditPostRequestDTO = z.infer<typeof editPostRequestDTO>;
