import { strings } from "resources/strings";
import { z } from "zod";

export const createPostRequestDTO = z.object({
    fileNames: z.array(z.string().min(1, strings.FILE_NAME_EMPTY_ERROR)),
    caption: z.string(),
    mentions: z.array(z.string()),
});

export type CreatePostRequestDTO = z.infer<typeof createPostRequestDTO>;