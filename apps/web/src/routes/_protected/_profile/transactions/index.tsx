import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { createFileRoute } from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { TransactionCard } from "@/components/transactions/transaction-card";
import { type TransactionList } from "@/gen/proto/fijoy/v1/transaction_pb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react/jsx-runtime";
import { graphql } from "relay-runtime";
import { loadQuery, usePreloadedQuery } from "react-relay";
import {
  transactionsQuery,
  transactionsQuery$data,
} from "./__generated__/transactionsQuery.graphql";

export const Route = createFileRoute("/_protected/_profile/transactions/")({
  loader: ({ context }) => {
    const transactionsQueryRef = loadQuery<transactionsQuery>(
      context.environment,
      TransactionsQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );

    return {
      transactionsQueryRef,
    };
  },
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

const TransactionsQuery = graphql`
  query transactionsQuery {
    transactions {
      id
      ...transactionCardFragment
    }
  }
`;

function Page() {
  const { transactionsQueryRef } = Route.useLoaderData();
  const data = usePreloadedQuery(TransactionsQuery, transactionsQueryRef);

  return (
    <div className="p-4 lg:p-6">
      <PageHeader>
        <PageHeaderHeading>Transactions</PageHeaderHeading>
        <PageHeaderDescription>
          See all the transactions made to your accounts
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2"></div>

      <TransactionList transactions={data.transactions} />
    </div>
  );
}

function TransactionList({
  transactions,
}: {
  transactions: transactionsQuery$data["transactions"];
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
