import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import z from "zod";
import { ButtonGroup } from "@/components/ui/button-group";
import NewIncome from "./-components/transactions/new-income";
import NewExpense from "./-components/transactions/new-expense";
import NewTransfer from "./-components/transactions/new-transfer";

const Add = z.enum(["income", "expense", "transfer"]).optional();
const transactionsRouteSchema = z.object({
  add: Add,
});
type Add = z.infer<typeof Add>;

export const Route = createFileRoute("/_protected/_profile/transactions")({
  pendingComponent: CenterLoadingSpinner,
  component: Page,
  validateSearch: (search) => {
    return transactionsRouteSchema.parse(search);
  },
});

const TransactionsPageFragment = graphql`
  fragment transactionsPageFragment on Query
  @refetchable(queryName: "TransactionsPageRefetch") {
    ...transactionDataTableFragment
    ...newExpenseFragment
    ...newIncomeFragment
    ...newTransferFragment
  }
`;

function Page() {
  const navigate = useNavigate();
  const { rootQueryRef } = Route.useRouteContext();
  const { add } = Route.useSearch();

  const navigateTo = useCallback(
    (add: Add) => {
      navigate({
        to: Route.to,
        search: { add },
      });
    },
    [navigate],
  );

  useEffect(() => {
    if (add) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "e") {
        navigateTo("expense");
      }
      if (event.key === "i") {
        navigateTo("income");
      }
      if (event.key === "t") {
        navigateTo("transfer");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigateTo, add]);

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fragmentData, refetch] = useRefetchableFragment<
    TransactionsPageRefetch,
    transactionsPageFragment$key
  >(TransactionsPageFragment, data);

  return (
    <div className="">
      <ButtonGroup>
        <Button>New</Button>
        <Button variant="outline" onClick={() => navigateTo("expense")}>
          Expense (e)
        </Button>
        <Button variant="outline" onClick={() => navigateTo("income")}>
          Income (i)
        </Button>
        <Button variant="outline" onClick={() => navigateTo("transfer")}>
          Transfer (t)
        </Button>
      </ButtonGroup>

      <div className="py-2"></div>

      <TransactionDataTable transactionDataTableFragment={fragmentData} />

      <NewExpense fragmentRef={fragmentData} />
      <NewIncome fragmentRef={fragmentData} />
      <NewTransfer fragmentRef={fragmentData} />
    </div>
  );
}
