import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { columns } from "@/components/transactions/columns";
import { DataTable } from "@/components/transactions/data-table";
import { getTransactionsQueryOptions } from "@/lib/queries/transaction";
// import NewTransaction from "@/components/transactions/new-transaction";
// import { accountsQueryOptions } from "@/lib/queries/account";
// import { categoriesQueryOptions } from "@/lib/queries/category";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/transactions",
)({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      getTransactionsQueryOptions({ context: opts.context }),
    ),
  component: Page,
});

function Page() {
  const context = Route.useRouteContext();

  // const { data: categories } = useSuspenseQuery(
  //   categoriesQueryOptions(workspace.id),
  // );

  const transactionsQuery = useSuspenseQuery(
    getTransactionsQueryOptions({ context }),
  );

  const transactions = transactionsQuery.data.transactions;

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

      <div className="py-4" />

      {/* <NewTransaction */}
      {/*   accounts={accounts} */}
      {/*   workspace={workspace} */}
      {/*   categories={categories} */}
      {/* /> */}

      <div className="py-4" />

      <DataTable columns={columns} data={transactions} />
    </div>
  );
}

export default Page;
