import { z } from "zod";

export const SetupStep = z.enum(["name-namespace", "currency-locale", "final"]);

export type SetupStep = z.infer<typeof SetupStep>;

export const NameNamespaceStepData = z.object({
  name: z.string(),
  namespace: z.string(),
});

export type NameNamespaceStepData = z.infer<typeof NameNamespaceStepData>;

export const CurrencyLocaleStepData = z.object({
  primaryCurrency: z.string(),
  locale: z.string(),
});

export type CurrencyLocaleStepData = z.infer<typeof CurrencyLocaleStepData>;
