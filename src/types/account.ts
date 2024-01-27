import { accountTypes, institutions } from "@/config/account";
import { z } from "zod";

export const Account = z.object({
  ID: z.string(),
  Name: z.string(),
  AccountType: z.enum(accountTypes),
  Institution: z.enum(institutions),
  WorkspaceID: z.string(),
  Balance: z.number(),
  UpdatedAt: z.coerce.date(),
});

export type Account = z.infer<typeof Account>;
