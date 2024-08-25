import { strings } from "resources/strings";
import { z } from "zod";

export const createPostRequestDTO = z.object({
  fileNames: z
    .array(z.string().min(1, strings.FILE_NAME_EMPTY_ERROR))
    .nonempty(strings.POST_MUST_HAVE_PHOTO_ERROR),
  caption: z.string().nullish(),
  mentions: z.array(z.string().min(1, strings.MENTION_EMPTY_ERROR)).nullish(),
});

export type CreatePostRequestDTO = z.infer<typeof createPostRequestDTO>;
