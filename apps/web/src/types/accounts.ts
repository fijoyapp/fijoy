import { z } from "zod";

export const NewAccountStep = z.enum([
  "name",
  "type",
  "institution",
  "balance",
  "final",
]);

export type NewAccountStep = z.infer<typeof NewAccountStep>;
