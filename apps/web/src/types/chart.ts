import { z } from "zod";

export const ChartTimeRange = z.enum(["1W", "1M", "3M", "6M", "1Y", "ALL"]);
export type ChartTimeRange = z.infer<typeof ChartTimeRange>;
