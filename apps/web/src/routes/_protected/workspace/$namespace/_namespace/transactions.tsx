import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { columns } from "@/components/transactions/columns";
import { DataTable } from "@/components/transactions/data-table";
// import NewTransaction from "@/components/transactions/new-transaction";
// import { accountsQueryOptions } from "@/lib/queries/account";
// import { categoriesQueryOptions } from "@/lib/queries/category";
import { transactionsQueryOptions } from "@/lib/queries/transaction";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/transactions",
)({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      transactionsQueryOptions(opts.context.workspace.id),
    ),
  component: Page,
});

function Page() {
  const { workspace } = Route.useRouteContext();

  // const { data: categories } = useSuspenseQuery(
  //   categoriesQueryOptions(workspace.id),
  // );

  const { data: transactions } = useSuspenseQuery(
    transactionsQueryOptions(workspace.id),
  );

  // const { data: accounts } = useSuspenseQuery(
  //   accountsQueryOptions(workspace.id),
  // );

  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Transactions</PageHeaderHeading>
        <PageHeaderDescription className="">
          The home for all your transactions.
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2 lg:py-4" />

      {/* <NewTransaction */}
      {/*   accounts={accounts} */}
      {/*   workspace={workspace} */}
      {/*   categories={categories} */}
      {/* /> */}

      <div className="py-2 lg:py-4" />

      <DataTable columns={columns} data={transactions} />
    </div>
  );
}

export default Page;
