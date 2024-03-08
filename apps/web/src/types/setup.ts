import { z } from "zod";

export const SetupStep = z.enum(["general", "currency", "final"]);

export type SetupStep = z.infer<typeof SetupStep>;

export const GeneralStepData = z.object({
  name: z.string(),
  namespace: z.string(),
});

export type GeneralStepData = z.infer<typeof GeneralStepData>;

export const CurrencyStepData = z.object({
  primaryCurrency: z.string(),
});

export type CurrencyStepData = z.infer<typeof CurrencyStepData>;
