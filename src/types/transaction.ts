import { transactionTypes } from "@/config/transaction";
import { z } from "zod";

export const SelectTransaction = z.object({
  ID: z.string(),
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
  PayeeName: z.string(),
  PayerName: z.string(),
  // TODO: add tags back
});

export type SelectTransaction = z.infer<typeof SelectTransaction>;
