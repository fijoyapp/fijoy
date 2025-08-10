import { z } from "zod";

export const SetupStep = z.enum(["currency", "goal", "final"]);

export type SetupStep = z.infer<typeof SetupStep>;

export const CurrencyStepData = z.object({
  currencies: z.array(z.string()).min(1, {
    message: "At least one currency is required",
  }),
});

export type CurrencyStepData = z.infer<typeof CurrencyStepData>;

export const GoalStepData = z.object({
  net_worth_goal: z.string(),
});

export type GoalStepData = z.infer<typeof GoalStepData>;
