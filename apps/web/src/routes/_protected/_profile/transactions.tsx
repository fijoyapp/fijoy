import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { createFileRoute } from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import {
  graphql,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";
import { rootQuery } from "@/routes/__root";
import type { RootQuery } from "@/routes/__generated__/RootQuery.graphql";
import type { TransactionsPageRefetch } from "./__generated__/TransactionsPageRefetch.graphql";
import type { transactionsPageFragment$key } from "./__generated__/transactionsPageFragment.graphql";
import TransactionDataTable from "./-components/transactions/transaction-data-table";

export const Route = createFileRoute("/_protected/_profile/transactions")({
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

const TransactionsPageFragment = graphql`
  fragment transactionsPageFragment on Query
  @refetchable(queryName: "TransactionsPageRefetch") {
    ...transactionDataTableFragment
  }
`;

function Page() {
  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fragmentData, refetch] = useRefetchableFragment<
    TransactionsPageRefetch,
    transactionsPageFragment$key
  >(TransactionsPageFragment, data);

  return (
    <div className="p-4 lg:p-6">
      <PageHeader>
        <PageHeaderHeading>Transactions</PageHeaderHeading>
        <PageHeaderDescription>
          See all the transactions made to your accounts
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2"></div>

      <TransactionDataTable transactionDataTableFragment={fragmentData} />
    </div>
  );
}
