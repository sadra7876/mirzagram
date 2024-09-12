import { z } from "zod";

export const searchRequestDTO = z.object({
  query: z.union([z.string(), z.number(), z.symbol()]),
});

export type SearchRequestDTO = z.infer<typeof searchRequestDTO>;
