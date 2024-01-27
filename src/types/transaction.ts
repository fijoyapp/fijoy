import { transactionTypes } from "@/config/transaction";
import { z } from "zod";

export const Transaction = z.object({
  Id: z.string(),
  TransactionType: z.enum(transactionTypes),
  Amount: z.number(),
  FromAccountID: z.string(),
  ToAccountID: z.string(),
  UserID: z.string(),
  WorkspaceID: z.string(),
  Datetime: z.string(),
  Note: z.string(),
  CategoryID: z.string(),
  PayeeID: z.string(),
});

export type Transaction = z.infer<typeof Transaction>;
