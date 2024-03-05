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
  // const { workspace } = Route.useRouteContext();

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
      <div className="py-2 lg:py-4" />

      {/* <NewTransaction */}
      {/*   accounts={accounts} */}
      {/*   workspace={workspace} */}
      {/*   categories={categories} */}
      {/* /> */}
    </div>
  );
}

export default Page;
