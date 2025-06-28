import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Props = {
  newTransactionSheetOpen: boolean;
  setNewTransactionSheetOpen: (open: boolean) => void;
};

export const NewTransaction = ({
  newTransactionSheetOpen,
  setNewTransactionSheetOpen,
}: Props) => {
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
      </SheetContent>
    </Sheet>
  );
};
