import { z } from "zod";

export const uploadType = z.union([z.literal("profile"), z.literal("post")]);
