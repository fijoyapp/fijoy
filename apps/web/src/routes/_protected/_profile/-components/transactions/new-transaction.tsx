import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { type newTransactionMutation } from "./__generated__/newTransactionMutation.graphql";
import { Button } from "@/components/ui/button";

type Props = {
  newTransactionSheetOpen: boolean;
  setNewTransactionSheetOpen: (open: boolean) => void;
};

const NewTransactionMutation = graphql`
  mutation newTransactionMutation($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
    }
  }
`;

export const NewTransaction = ({
  newTransactionSheetOpen,
  setNewTransactionSheetOpen,
}: Props) => {
  const [commitMutation, isMutationInFlight] =
    useMutation<newTransactionMutation>(NewTransactionMutation);

  const onSubmit = () => {
    commitMutation({
      variables: {
        input: {
          transactionEntries: [],
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
