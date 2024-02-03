import { transactionTypes } from "@/config/transaction";
import z from "zod";

export const SelectCategory = z.object({
  ID: z.string(),
  WorkspaceID: z.string(),
  Name: z.string(),
  CategoryType: z.enum(transactionTypes),
});

export type SelectCategory = z.infer<typeof SelectCategory>;

export const InsertCategory = SelectCategory.pick({
  Name: true,
  CategoryType: true,
});

export type InsertCategory = z.infer<typeof InsertCategory>;
