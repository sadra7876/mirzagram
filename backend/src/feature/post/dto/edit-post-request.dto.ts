import { strings } from "resources/strings";
import { z } from "zod";

export const editPostRequestDTO = z.object({
  fileNames: z
    .array(z.string().min(1, strings.FILE_NAME_EMPTY_ERROR))
    .nullish(),
  caption: z.string().nullish(),
  mentions: z.array(z.string().min(1, strings.MENTION_EMPTY_ERROR)).nullish(),
});

export type EditPostRequestDTO = z.infer<typeof editPostRequestDTO>;
