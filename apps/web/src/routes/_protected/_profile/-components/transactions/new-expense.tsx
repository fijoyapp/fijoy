import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { newExpenseFragment$key } from "./__generated__/newExpenseFragment.graphql";
import { graphql } from "relay-runtime";
import { getRouteApi } from "@tanstack/react-router";
import { useFragment } from "react-relay";

type Props = {
  fragmentRef: newExpenseFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/transactions");

const fragment = graphql`
  fragment newExpenseFragment on Query {
    accounts(first: 20) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

const NewExpense = ({ fragmentRef }: Props) => {
  const { add } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const data = useFragment(fragment, fragmentRef);

  return (
    <Sheet
      open={add === "expense"}
      onOpenChange={(open) =>
        navigate({
          to: "/transactions",
          search: {
            add: open ? "expense" : undefined,
          },
        })
      }
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Expense</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NewExpense;
