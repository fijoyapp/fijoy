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
import {
  graphql,
  usePreloadedQuery,
  useRefetchableFragment,
} from "react-relay";
import { rootQuery } from "@/routes/__root";
import type { RootQuery } from "@/routes/__generated__/RootQuery.graphql";
import type { TransactionsPageRefetch } from "./__generated__/TransactionsPageRefetch.graphql";
import type { transactionsPageFragment$key } from "./__generated__/transactionsPageFragment.graphql";

export const Route = createFileRoute("/_protected/_profile/transactions")({
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

const TransactionsPageFragment = graphql`
  fragment transactionsPageFragment on Query
  @refetchable(queryName: "TransactionsPageRefetch") {
    transactions(first: 5) {
      edges {
        node {
          id
          ...transactionCardFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
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

      {fragmentData.transactions.edges?.length !== 0 && (
        <Card className="">
          {fragmentData.transactions.edges?.map((edge, idx) => {
            invariant(edge?.node);
            if (idx === 0) {
              return (
                <TransactionCard
                  transactionRef={edge.node}
                  key={edge.node.id}
                />
              );
            }

            return (
              <Fragment key={edge.node.id}>
                <Separator className="" />
                <TransactionCard transactionRef={edge.node} />
              </Fragment>
            );
          })}
        </Card>
      )}
    </div>
  );
}
