import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import NewTransaction from "@/components/transactions/new-transaction";
import { workspacesQueryOptions } from "@/lib/queries/workspace";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/",
)({
  component: Page,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(workspacesQueryOptions()),
});

function Page() {
  const { workspace } = Route.useRouteContext();
  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Hey there!</PageHeaderHeading>
        <PageHeaderDescription className="">
          Welcome back! How are you doing today?
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-2 lg:py-4" />
      <NewTransaction accounts={[]} workspace={workspace} />
    </div>
  );
}

export default Page;
