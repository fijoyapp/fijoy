import { z, type TypeOf } from "zod";

export const AccountType = z.enum([
  "investment",
  "liability",
  "liquidity",
  "property",
  "receivable",
]);

export type AccountType = TypeOf<typeof AccountType>;

export type AccountTypeDetail = {
  name: string;
  description: string;
};
