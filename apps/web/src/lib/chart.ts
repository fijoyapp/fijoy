import { ChartTimeRange } from "@/types/chart";
import { Timestamp } from "@bufbuild/protobuf";
import { match } from "ts-pattern";

export function chartTimeRangeToInterval(chartTimeRange: ChartTimeRange): {
  fromDatehour: Timestamp;
  toDatehour: Timestamp;
} {
  const to = dateTruncDay(new Date());

  return match(chartTimeRange)
    .with("1W", () => {
      const from = dateTruncDay(new Date(to));
      from.setDate(from.getDate() - 7);
      return buildInterval(from, to);
    })
    .with("1M", () => {
      const from = dateTruncDay(new Date(to));
      from.setMonth(from.getMonth() - 1);
      return buildInterval(from, to);
    })
    .with("3M", () => {
      const from = dateTruncDay(new Date(to));
      from.setMonth(from.getMonth() - 3);
      return buildInterval(from, to);
    })
    .with("6M", () => {
      const from = dateTruncDay(new Date(to));
      from.setMonth(from.getMonth() - 6);
      return buildInterval(from, to);
    })
    .with("1Y", () => {
      const from = dateTruncDay(new Date(to));
      from.setFullYear(from.getFullYear() - 1);
      return buildInterval(from, to);
    })
    .with("ALL", () => {
      const earliestDate = new Date(0);
      return buildInterval(earliestDate, to);
    })
    .exhaustive();
}

function buildInterval(
  from: Date,
  to: Date,
): {
  fromDatehour: Timestamp;
  toDatehour: Timestamp;
} {
  return {
    fromDatehour: Timestamp.fromDate(from),
    toDatehour: Timestamp.fromDate(to),
  };
}

export function dateTruncDay(date: Date): Date {
  return new Date(date.toISOString().split("T")[0]);
}

export function dateTruncHour(date: Date): Date {
  return new Date(date.toISOString().split(":")[0]);
}
