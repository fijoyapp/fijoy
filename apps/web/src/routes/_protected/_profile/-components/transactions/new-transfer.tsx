import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { newTransferFragment$key } from "./__generated__/newIncomeFragment.graphql";
import { graphql } from "relay-runtime";
import { getRouteApi } from "@tanstack/react-router";
import { useFragment } from "react-relay";

type Props = {
  fragmentRef: newTransferFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/transactions");

const fragment = graphql`
  fragment newTransferFragment on Query {
    accounts(first: 20) {
      edges {
        node {
          name
        }
      }
    }
  }
`;

const NewTransfer = ({ fragmentRef }: Props) => {
  const { add } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const data = useFragment(fragment, fragmentRef);

  return (
    <Sheet
      open={add === "transfer"}
      onOpenChange={(open) =>
        navigate({
          to: "/transactions",
          search: {
            add: open ? "transfer" : undefined,
          },
        })
      }
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transfer</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NewTransfer;
