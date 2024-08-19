import { z, type TypeOf } from "zod";

export const SetupStep = z.enum(["currency-locale", "final"]);

export type SetupStep = TypeOf<typeof SetupStep>;

export const CurrencyLocaleStepData = z.object({
  currencies: z.array(z.string()),
  locale: z.string(),
});

export type CurrencyLocaleStepData = TypeOf<typeof CurrencyLocaleStepData>;
