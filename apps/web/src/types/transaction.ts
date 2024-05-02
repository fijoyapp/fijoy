import { TypeOf, z } from "zod";

export const TransactionTypeEnum = z.enum(["expense", "income", "transfer"]);
export type TransactionTypeEnum = TypeOf<typeof TransactionTypeEnum>;
