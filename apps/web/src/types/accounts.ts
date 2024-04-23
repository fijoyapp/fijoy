import { z, type TypeOf } from "zod";

export const NewAccountSteps = [
  "name-type-institution",
  "balance",
  "final",
] as const;

export const NewAccountStep = z.enum(NewAccountSteps);

export type NewAccountStep = TypeOf<typeof NewAccountStep>;

export const AccountTypeEnum = z.enum([
  "cash",
  "debt",
  "investment",
  "other_asset",
]);
export type AccountTypeEnum = TypeOf<typeof AccountTypeEnum>;

export const NameTypeInstitutionStepData = z.object({
  name: z.string().min(1, { message: "Required" }),
  type: AccountTypeEnum,
  institution: z.string().min(1, { message: "Required" }),
});
export type NameTypeInstitutionStepData = TypeOf<
  typeof NameTypeInstitutionStepData
>;

export const BalanceStepData = z.object({
  balance: z.string(),
});
export type BalanceStepData = TypeOf<typeof BalanceStepData>;
