import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { chartTimeRangeToInterval } from "@/lib/chart";
import { getOverallSnapshotsQueryOptions } from "@/lib/queries/snapshot";
import { ChartTimeRange } from "@/types/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const homeRouteSchema = z.object({
  range: ChartTimeRange.default("1M").optional(),
});

export const Route = createFileRoute("/_protected/_profile/home/")({
  component: HomePage,
  validateSearch: (search) => {
    return homeRouteSchema.parse(search);
  },
  loaderDeps: ({ search: { range } }) => ({ range }),
  loader: (opts) => {
    const { fromDatehour, toDatehour } = chartTimeRangeToInterval(
      opts.deps.range || "1M",
    );
    return opts.context.queryClient.ensureQueryData(
      getOverallSnapshotsQueryOptions({
        fromDatehour,
        toDatehour,
        context: opts.context,
      }),
    );
  },
  pendingComponent: CenterLoadingSpinner,
});

function HomePage() {
  const { range } = Route.useSearch();
  const context = Route.useRouteContext();
  const { fromDatehour, toDatehour } = chartTimeRangeToInterval(range || "1M");
  const { data } = useSuspenseQuery(
    getOverallSnapshotsQueryOptions({
      fromDatehour,
      toDatehour,
      context,
    }),
  );

  console.log(data);

  return (
    <div className="p-4 lg:p-6">
      <div>Welcome to Fijoy! </div>
    </div>
  );
}
