import { strings } from "resources/strings";
import { z } from "zod";

export const bookmarkRequestDTO = z.object({
  postId: z.string().min(1, strings.POST_ID_CANNOT_BE_EMPTY_ERROR),
});

export type BookmarkRequestDTO = z.infer<typeof bookmarkRequestDTO>;
