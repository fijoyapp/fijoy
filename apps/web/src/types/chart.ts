import { z, type TypeOf } from "zod";

export const ChartTimeRange = z.enum(["1W", "1M", "3M", "6M", "1Y", "ALL"]);
export type ChartTimeRange = TypeOf<typeof ChartTimeRange>;
