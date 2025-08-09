import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { newIncomeFragment$key } from "./__generated__/newIncomeFragment.graphql";
import { graphql } from "relay-runtime";
import { getRouteApi } from "@tanstack/react-router";
import { useFragment } from "react-relay";

type Props = {
  fragmentRef: newIncomeFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/transactions");

const fragment = graphql`
  fragment newIncomeFragment on Query {
    accounts(first: 20) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

const NewIncome = ({ fragmentRef }: Props) => {
  const { add } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const data = useFragment(fragment, fragmentRef);

  return (
    <Sheet
      open={add === "income"}
      onOpenChange={(open) =>
        navigate({
          to: "/transactions",
          search: {
            add: open ? "income" : undefined,
          },
        })
      }
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Income</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NewIncome;
