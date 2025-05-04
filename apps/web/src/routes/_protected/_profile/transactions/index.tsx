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
import { loadQuery, useFragment, useLazyLoadQuery } from "react-relay";
import { transactionsQuery } from "./__generated__/transactionsQuery.graphql";
import { transactionsFragment$key } from "./__generated__/transactionsFragment.graphql";

export const Route = createFileRoute("/_protected/_profile/transactions/")({
  loader: ({ context }) => {
    loadQuery(
      context.environment,
      TransactionsQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );
  },
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

const TransactionsQuery = graphql`
  query transactionsQuery {
    transactions {
      ...transactionsFragment
    }
  }
`;

const TransactionsFragment = graphql`
  fragment transactionsFragment on Transaction @relay(plural: true) {
    id
    note
    amount
    datetime
    createdAt
    updatedAt
    account {
      symbol
      symbolType
    }
  }
`;

function Page() {
  const data = useLazyLoadQuery<transactionsQuery>(TransactionsQuery, {});

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
  transactions: transactionsFragment$key;
}) {
  const data = useFragment(TransactionsFragment, transactions);
  return (
    <Card className="">
      {data.map((transaction, idx) => {
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
