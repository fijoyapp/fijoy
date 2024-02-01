import z from "zod";

export const SelectWorkspace = z.object({
  ID: z.string(),
  Name: z.string(),
  Namespace: z.string(),
  CreatedAt: z.string(),
});

export type SelectWorkspace = z.infer<typeof SelectWorkspace>;
