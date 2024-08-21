import { z, type TypeOf } from "zod";

export const SetupStep = z.enum(["currency", "final"]);

export type SetupStep = TypeOf<typeof SetupStep>;

export const CurrencyStepData = z.object({
  currencies: z.array(z.string()),
});

export type CurrencyStepData = TypeOf<typeof CurrencyStepData>;
