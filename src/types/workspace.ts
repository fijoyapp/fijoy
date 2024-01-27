import z from "zod";

export const Workspace = z.object({
  ID: z.string(),
  Name: z.string(),
  Namespace: z.string(),
  CreatedAt: z.string(),
});

export type Workspace = z.infer<typeof Workspace>;
