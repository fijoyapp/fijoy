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
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  );
}

export default Page;
