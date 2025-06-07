import invariant from "tiny-invariant";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { createFileRoute } from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { TransactionCard } from "@/components/transactions/transaction-card";
import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Fragment } from "react/jsx-runtime";
import { usePreloadedQuery } from "react-relay";
import { rootQuery } from "@/routes/__root";
import {
  RootQuery,
  RootQuery$data,
} from "@/routes/__generated__/RootQuery.graphql";

export const Route = createFileRoute("/_protected/_profile/transactions")({
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

  invariant(data.transactions);

  return (
    <div className="p-4 lg:p-6">
      <PageHeader>
        <PageHeaderHeading>Transactions</PageHeaderHeading>
        <PageHeaderDescription>
          See all the transactions made to your accounts
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2"></div>

      {data.transactions.length !== 0 && (
        <TransactionList transactions={data.transactions} />
      )}
    </div>
  );
}

function TransactionList({
  transactions,
}: {
  transactions: NonNullable<RootQuery$data["transactions"]>;
}) {
  return (
    <Card className="">
      {transactions.map((transaction, idx) => {
        if (idx === 0) {
          return (
            <TransactionCard
              transactionRef={transaction}
              key={transaction.id}
            />
          );
        }

        return (
          <Fragment key={transaction.id}>
            <Separator className="" />
            <TransactionCard transactionRef={transaction} />
          </Fragment>
        );
      })}
    </Card>
  );
}
