import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { transactionTypes } from "@/config/transaction";
import _ from "lodash";
import IncomeForm from "./income-form";
import TransferForm from "./transfer-form";
import ExpenseForm from "./expense-form";
import { SelectAccount } from "@/types/account";
import { useMutation } from "@tanstack/react-query";
import { env } from "@/env";
import axios from "axios";
import { SelectTransaction } from "@/types/transaction";

export const formSchema = SelectTransaction;

type Props = {
  accounts: SelectAccount[];
};

const NewTransaction = ({ accounts }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const createTransaction = useMutation({
    mutationFn: async (values: SelectTransaction) => {
      const result = await axios.post(env + "/transaction", values, {
        withCredentials: true,
      });
      return SelectAccount.parse(result.data);
    },
    onSuccess: () => {
      form.reset();
      setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(createTransaction.mutateAsync(values), {
      success: "Transaction created!",
      loading: "Creating transaction...",
      error: "Failed to create transaction.",
    });
  }

  return (
    <div className="">
      <Button
        onClick={() => setOpen(true)}
        variant="default"
        className="w-full lg:w-48"
      >
        <Plus className="mr-2 h-6 w-6" />
        New Transaction
      </Button>

      <Sheet open={open} onOpenChange={(open) => setOpen(open)} modal={true}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="create-transaction">
            <SheetContent className="max-h-screen space-y-2 overflow-y-scroll p-4">
              <SheetHeader>
                <SheetTitle>New Transaction</SheetTitle>
                <SheetDescription>
                  Add a new transaction to Fijoy.
                </SheetDescription>
              </SheetHeader>
              <div className="py-1"></div>
              <div className="space-y-4 p-1">
                <FormField
                  control={form.control}
                  name="TransactionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a transaction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {transactionTypes.map((type) => (
                            <SelectItem value={type} key={type}>
                              {_.capitalize(type)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This can be expense, income, or transfer.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("TransactionType") === "expense" && (
                  <ExpenseForm form={form} accounts={accounts} />
                )}
                {form.watch("TransactionType") === "income" && (
                  <IncomeForm form={form} />
                )}
                {form.watch("TransactionType") === "transfer" && (
                  <TransferForm form={form} />
                )}

                <Button
                  type="submit"
                  form="create-transaction"
                  className="w-full"
                >
                  Create
                </Button>
              </div>
            </SheetContent>
          </form>
        </Form>
      </Sheet>
    </div>
  );
};

export default NewTransaction;
