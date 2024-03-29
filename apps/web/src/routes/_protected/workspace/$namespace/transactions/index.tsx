import { getTransactionsQueryOptions } from "@/lib/queries/transaction";
import NewTransaction from "@/components/transactions/new-transaction";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
// import { accountsQueryOptions } from "@/lib/queries/account";
// import { categoriesQueryOptions } from "@/lib/queries/category";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import { Icons } from "@/components/icons";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/transactions/",
)({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      getTransactionsQueryOptions({ context: opts.context }),
    ),
  pendingComponent: () => (
    <div>
      <Icons.spinner className="animate-spin" />,
    </div>
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

  const accountsQuery = useSuspenseQuery(getAccountsQueryOptions({ context }));

  const accounts = accountsQuery.data.accounts;

  // const { data: accounts } = useSuspenseQuery(
  //   accountsQueryOptions(workspace.id),
  // );

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Transactions</PageHeaderHeading>
        <PageHeaderDescription>
          All your transactions in one place
        </PageHeaderDescription>
      </PageHeader>

      <NewTransaction
        accounts={accounts}
        workspace={context.workspace}
        categories={[]} // FIXME: load categories
      />

      <DataTable columns={columns} data={transactions} />
    </>
  );
}
