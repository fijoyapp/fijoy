import { z } from "zod";

export const AccountType = z.enum([
  "investment",
  "liability",
  "liquidity",
  "property",
  "receivable",
]);

export type AccountType = z.infer<typeof AccountType>;

export type AccountTypeDetail = {
  name: string;
  description: string;
};
