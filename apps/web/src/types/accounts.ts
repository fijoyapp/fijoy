import { z } from "zod";

export const NewAccountSteps = [
  "name",
  "type",
  "institution",
  "balance",
  "final",
] as const;

export const NewAccountStep = z.enum(NewAccountSteps);

export type NewAccountStep = z.infer<typeof NewAccountStep>;

export const NameStepData = z.object({
  name: z.string().min(1, { message: "Required" }),
});
export type NameStepData = z.infer<typeof NameStepData>;

export const AccountTypeEnum = z.enum([
  "cash",
  "debt",
  "investment",
  "other_asset",
]);
export type AccountTypeEnum = z.infer<typeof AccountTypeEnum>;

export const TypeStepData = z.object({
  type: AccountTypeEnum,
});
export type TypeStepData = z.infer<typeof TypeStepData>;

export const InstitutionStepData = z.object({
  institution: z.string().min(1, { message: "Required" }),
});
export type InstitutionStepData = z.infer<typeof InstitutionStepData>;

export const BalanceStepData = z.object({
  balance: z.coerce.number(),
});
export type BalanceStepData = z.infer<typeof BalanceStepData>;
