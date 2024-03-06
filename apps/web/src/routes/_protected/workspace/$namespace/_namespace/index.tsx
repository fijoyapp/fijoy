import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
// import NewTransaction from "@/components/transactions/new-transaction";
// import { accountsQueryOptions } from "@/lib/queries/account";
// import { categoriesQueryOptions } from "@/lib/queries/category";
// import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getWorkspacesQueryOptions } from "@/lib/queries/workspace";
import { Button } from "@/components/ui/button";
import { populateExample } from "@/lib/example";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/",
)({
  component: Page,
  loader: async (opts) => {
    const data = await opts.context.queryClient.ensureQueryData(
      getWorkspacesQueryOptions({ context: opts.context }),
    );
    return data;
  },
});

function Page() {
  const { workspace } = Route.useRouteContext();

  // const { data: categories } = useSuspenseQuery(
  //   categoriesQueryOptions(workspace.id),
  // );
  //
  // const { data: accounts } = useSuspenseQuery(
  //   accountsQueryOptions(workspace.id),
  // );

  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Hey there!</PageHeaderHeading>
        <PageHeaderDescription className="">
          Welcome back! How are you doing today?
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-4" />

      {import.meta.env.DEV && (
        <Button
          variant="outline"
          onClick={async () => await populateExample(workspace)}
        >
          Populate Example
        </Button>
      )}

      {/* <NewTransaction */}
      {/*   accounts={accounts} */}
      {/*   workspace={workspace} */}
      {/*   categories={categories} */}
      {/* /> */}
    </div>
  );
}

export default Page;
