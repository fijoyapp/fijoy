import { getTransactionsQueryOptions } from "@/lib/queries/transaction";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { TransactionCard } from "@/components/transactions/transaction-card";
import { type TransactionList } from "@/gen/proto/fijoy/v1/transaction_pb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/_protected/_profile/transactions/")({
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      getTransactionsQueryOptions({ context: opts.context }),
    ),
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const context = Route.useRouteContext();

  const { data: transactions } = useSuspenseQuery(
    getTransactionsQueryOptions({ context }),
  );

  return (
    <div className="p-4 lg:p-6">
      <PageHeader>
        <PageHeaderHeading>Transactions</PageHeaderHeading>
        <PageHeaderDescription>
          See all the transactions made to your accounts
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2"></div>

      <TransactionList transactions={transactions} />
    </div>
  );
}

function TransactionList({ transactions }: { transactions: TransactionList }) {
  return (
    <Card className="">
      {transactions.items.map((transaction, idx) => {
        if (idx === 0) {
          return (
            <TransactionCard transaction={transaction} key={transaction.id} />
          );
        }

        return (
          <Fragment key={transaction.id}>
            <Separator className="" />
            <TransactionCard transaction={transaction} />
          </Fragment>
        );
      })}
    </Card>
  );
}
