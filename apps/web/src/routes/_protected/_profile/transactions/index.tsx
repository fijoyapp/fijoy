// import { getTransactionsQueryOptions } from "@/lib/queries/transaction";
// import NewTransaction from "@/components/transactions/new-transaction";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
// import { accountsQueryOptions } from "@/lib/queries/account";
// import { categoriesQueryOptions } from "@/lib/queries/category";
// import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
// import { getAccountsQueryOptions } from "@/lib/queries/account";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

export const Route = createFileRoute("/_protected/_profile/transactions/")({
  // loader: (opts) =>
  //   opts.context.queryClient.ensureQueryData(
  //     getTransactionsQueryOptions({ context: opts.context }),
  //   ),
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  // const context = Route.useRouteContext();

  // const { data: categories } = useSuspenseQuery(
  //   categoriesQueryOptions(workspace.id),
  // );

  // const transactionsQuery = useSuspenseQuery(
  //   getTransactionsQueryOptions({ context }),
  // );

  // const transactions = transactionsQuery.data.transactions;

  // const accountsQuery = useSuspenseQuery(getAccountsQueryOptions({ context }));

  // const accounts = accountsQuery.data.accounts;

  // const { data: accounts } = useSuspenseQuery(
  //   accountsQueryOptions(workspace.id),
  // );

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>History</PageHeaderHeading>
        <PageHeaderDescription>
          See all the modifications made to your accounts
        </PageHeaderDescription>
      </PageHeader>

      {/* <NewTransaction */}
      {/*   accounts={accounts} */}
      {/*   workspace={context.workspace} */}
      {/*   categories={[]} // FIXME: load categories */}
      {/* /> */}
    </>
  );
}
