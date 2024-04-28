import { z, type TypeOf } from "zod";

export const SetupStep = z.enum(["name-namespace", "currency-locale", "final"]);

export type SetupStep = TypeOf<typeof SetupStep>;

export const NameNamespaceStepData = z.object({
  name: z.string(),
  namespace: z.string(),
});

export type NameNamespaceStepData = TypeOf<typeof NameNamespaceStepData>;

export const CurrencyLocaleStepData = z.object({
  primaryCurrency: z.string(),
  supportedCurrencies: z.array(z.string()),
  locale: z.string(),
});

export type CurrencyLocaleStepData = TypeOf<typeof CurrencyLocaleStepData>;
