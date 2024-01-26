import z from "zod";

export const User = z.object({
  Email: z.string(),
  ID: z.string(),
});

export type User = z.infer<typeof User>;
