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
import { NewTransaction } from "./-components/transactions/new-transaction";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_protected/_profile/transactions")({
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

const TransactionsPageFragment = graphql`
  fragment transactionsPageFragment on Query
  @refetchable(queryName: "TransactionsPageRefetch") {
    ...transactionDataTableFragment
    ...newTransactionFragment
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

  const [newTransactionSheetOpen, setNewTransactionSheetOpen] = useState(false);

  return (
    <div className="">
      <Button onClick={() => setNewTransactionSheetOpen((open) => !open)}>
        New Transaction
      </Button>
      <NewTransaction
        newTransactionFragment={fragmentData}
        newTransactionSheetOpen={newTransactionSheetOpen}
        setNewTransactionSheetOpen={setNewTransactionSheetOpen}
      />

      <div className="py-2"></div>

      <TransactionDataTable transactionDataTableFragment={fragmentData} />
    </div>
  );
}
