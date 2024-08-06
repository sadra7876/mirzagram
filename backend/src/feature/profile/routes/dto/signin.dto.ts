import { z } from "zod";

export const signinDTO = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
});

export type SigninDTO = z.infer<typeof signinDTO>;