import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { getOverallSnapshotsQueryOptions } from "@/lib/queries/snapshot";
import { getFormattedDate } from "@/lib/time";
import { Timestamp } from "@bufbuild/protobuf";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const homeRouteSchema = z.object({
  fromDatehour: z
    .string()
    .date()
    .default(() => {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return getFormattedDate(oneMonthAgo);
    }),
  toDatehour: z.string().date().default(getFormattedDate(new Date())),
});

export const Route = createFileRoute("/_protected/_profile/home/")({
  component: HomePage,
  validateSearch: (search) => {
    return homeRouteSchema.parse(search);
  },
  loaderDeps: ({ search: { fromDatehour, toDatehour } }) => ({
    fromDatehour,
    toDatehour,
  }),
  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      getOverallSnapshotsQueryOptions({
        fromDatehour: Timestamp.fromDate(new Date(opts.deps.fromDatehour)),
        toDatehour: Timestamp.fromDate(new Date(opts.deps.toDatehour)),
        context: opts.context,
      }),
    );
  },
  pendingComponent: CenterLoadingSpinner,
});

function HomePage() {
  const { fromDatehour, toDatehour } = Route.useSearch();
  const context = Route.useRouteContext();
  const { data } = useSuspenseQuery(
    getOverallSnapshotsQueryOptions({
      fromDatehour: Timestamp.fromDate(new Date(fromDatehour)),
      toDatehour: Timestamp.fromDate(new Date(toDatehour)),
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
