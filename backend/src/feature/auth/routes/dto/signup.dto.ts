import { z } from "zod";

export const signupDTO = z.object({
  username: z.string().min(1),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export type signupDTO = z.infer<typeof signupDTO>;
