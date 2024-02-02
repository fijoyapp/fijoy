import { transactionTypes } from "@/config/transaction";
import { z } from "zod";

export const SelectTransaction = z.object({
  Id: z.string(),
  TransactionType: z.enum(transactionTypes),
  Amount: z.number(),
  Currency: z.string(),
  FromAccountID: z.string(),
  ToAccountID: z.string(),
  UserID: z.string(),
  WorkspaceID: z.string(),
  Datetime: z.string(),
  Note: z.string(),
  CategoryID: z.string(),
  PayeeID: z.string(),
});

export type SelectTransaction = z.infer<typeof SelectTransaction>;
