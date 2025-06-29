import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFragment, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { type newTransactionMutation } from "./__generated__/newTransactionMutation.graphql";
import { Button } from "@/components/ui/button";
import type { newTransactionFragment$key } from "./__generated__/newTransactionFragment.graphql";

type Props = {
  newTransactionFragment: newTransactionFragment$key;
  newTransactionSheetOpen: boolean;
  setNewTransactionSheetOpen: (open: boolean) => void;
};

const NewTransactionMutation = graphql`
  mutation newTransactionMutation(
    $input: CreateTransactionWithTransactionEntriesInput!
  ) {
    createTransactionWithTransactionEntries(input: $input) {
      id
    }
  }
`;

const NewTransactionFragment = graphql`
  fragment newTransactionFragment on Query {
    accounts(first: 20) {
      edges {
        node {
          id
          name
          accountType
          balance
          currencySymbol
          amount
          ...cardFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const NewTransaction = ({
  newTransactionFragment,
  newTransactionSheetOpen,
  setNewTransactionSheetOpen,
}: Props) => {
  const [commitMutation, isMutationInFlight] =
    useMutation<newTransactionMutation>(NewTransactionMutation);

  const data = useFragment(NewTransactionFragment, newTransactionFragment);

  const onSubmit = () => {
    commitMutation({
      variables: {
        input: {
          transactionEntries: [
            {
              accountID: data.accounts.edges![0]?.node?.id || "",
              amount: "1000",
              transactionID: "",
            },
            {
              accountID: data.accounts.edges![1]?.node?.id || "",
              amount: "-1000",
              transactionID: "",
            },
          ],
        },
      },
    });
  };

  return (
    <Sheet
      open={newTransactionSheetOpen}
      onOpenChange={setNewTransactionSheetOpen}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Start tracking your expenses and income by adding a new transaction.
          </SheetDescription>
        </SheetHeader>
        <Button disabled={isMutationInFlight} onClick={onSubmit}>
          Create!
        </Button>
      </SheetContent>
    </Sheet>
  );
};
