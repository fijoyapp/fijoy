import { transactionTypes } from "@/config/transaction";
import { z } from "zod";
import { SelectCategory } from "./category";

const CommonSelect = z.object({
  ID: z.string(),
  Amount: z.number(),
  Currency: z.string(),
  UserID: z.string(),
  WorkspaceID: z.string(),
  // Datetime: z.string().default(new Date()),
  Note: z.string().optional(),
  CategoryID: z.string().optional(),
  CategoryDetail: SelectCategory,
});

const CommonInsert = CommonSelect.pick({
  Amount: true,
  Currency: true,
  // Datetime: true,
  Note: true,
  CategoryID: true,
});

export const SelectTransaction = z.discriminatedUnion("TransactionType", [
  z
    .object({
      TransactionType: z.literal(transactionTypes[0]),
      FromAccountID: z.string(),
      PayeeName: z.string().optional(),
    })
    .merge(CommonSelect),
  z
    .object({
      TransactionType: z.literal(transactionTypes[1]),
      ToAccountID: z.string(),
      PayerName: z.string().optional(),
    })
    .merge(CommonSelect),
  z
    .object({
      TransactionType: z.literal(transactionTypes[2]),
      FromAccountID: z.string(),
      ToAccountID: z.string(),
    })
    .merge(CommonSelect),
]);

export type SelectTransaction = z.infer<typeof SelectTransaction>;

export const InsertTransaction = z.discriminatedUnion("TransactionType", [
  z
    .object({
      TransactionType: z.literal("expense"),
      FromAccountID: z.string(),
      PayeeName: z.string().optional(),
    })
    .merge(CommonInsert),
  z
    .object({
      TransactionType: z.literal(transactionTypes[1]),
      ToAccountID: z.string(),
      PayerName: z.string().optional(),
    })
    .merge(CommonInsert),
  z
    .object({
      TransactionType: z.literal(transactionTypes[2]),
      FromAccountID: z.string(),
      ToAccountID: z.string(),
    })
    .merge(CommonInsert),
]);

export type InsertTransaction = z.infer<typeof InsertTransaction>;
