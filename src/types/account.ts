import { accountTypes, institutions } from "@/config/account";
import { z } from "zod";

export const SelectAccount = z.object({
  ID: z.string(),
  Name: z.string(),
  AccountType: z.enum(accountTypes),
  Institution: z.enum(institutions),
  WorkspaceID: z.string(),
  Balance: z.number(),
  Currency: z.string(),
  UpdatedAt: z.coerce.date(),
});

export type SelectAccount = z.infer<typeof SelectAccount>;

export const InsertAccount = SelectAccount.pick({
  Name: true,
  AccountType: true,
  Institution: true,
  Balance: true,
  Currency: true,
});

export type InsertAccount = z.infer<typeof InsertAccount>;
