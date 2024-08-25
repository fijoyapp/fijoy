import { z, type TypeOf } from "zod";

export const SetupStep = z.enum(["currency", "final"]);

export type SetupStep = TypeOf<typeof SetupStep>;

export const CurrencyStepData = z.object({
  currencies: z.array(z.string()).min(1, {
    message: "At least one currency is required",
  }),
});

export type CurrencyStepData = TypeOf<typeof CurrencyStepData>;
