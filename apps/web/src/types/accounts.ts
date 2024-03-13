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
