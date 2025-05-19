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
import { usePreloadedQuery } from "react-relay";
import { routeProtectedQuery$data } from "../../__generated__/routeProtectedQuery.graphql";
import { routeProfileQuery } from "../__generated__/routeProfileQuery.graphql";
import { RouteProfileQuery } from "../route";

export const Route = createFileRoute("/_protected/_profile/transactions/")({
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const { profileQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<routeProfileQuery>(
    RouteProfileQuery,
    profileQueryRef,
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

      <TransactionList transactions={data.transactions} />
    </div>
  );
}

function TransactionList({
  transactions,
}: {
  transactions: routeProtectedQuery$data["transactions"];
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
