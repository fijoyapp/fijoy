import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { newExpenseFragment$key } from "./__generated__/newExpenseFragment.graphql";
import { graphql } from "relay-runtime";
import { getRouteApi } from "@tanstack/react-router";
import { useFragment, useMutation } from "react-relay";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SelectAccount } from "./select-account";
import { MoneyField } from "../accounts/form/money";
import { useMemo } from "react";
import { NameField } from "../accounts/form/name";
import type { newExpenseMutation } from "./__generated__/newExpenseMutation.graphql";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  account: z.string(),
  total: z.string(),
  note: z.string().optional(),
});

type Props = {
  fragmentRef: newExpenseFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/transactions");

const fragment = graphql`
  fragment newExpenseFragment on Query {
    ...selectAccountFragment
    accounts(first: 20) {
      edges {
        node {
          id
          currencySymbol
        }
      }
    }
  }
`;

const mutation = graphql`
  mutation newExpenseMutation(
    $input: CreateTransactionWithTransactionEntriesInput!
  ) {
    createTransactionWithTransactionEntries(input: $input) {
      id
      datetime
      note
      balance
      transactionEntries {
        account {
          id
          balance
          amount
        }
      }
    }
  }
`;

const NewExpense = ({ fragmentRef }: Props) => {
  const { add } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<newExpenseMutation>(mutation);

  function onSubmit(values: z.infer<typeof formSchema>) {
    commitMutation({
      variables: {
        input: {
          note: values.note,
          transactionEntries: [
            {
              accountID: values.account,
              amount: "-" + values.total,
              transactionID: "0",
            },
          ],
        },
      },
      onCompleted(_, errors) {
        if (errors && errors.length > 0) {
          toast.error(errors.map((error) => error.message).join(", "));
        } else {
          navigate({
            to: "/transactions",
          });
        }
      },
    });
  }
  const data = useFragment(fragment, fragmentRef);

  const formAccount = form.watch("account");
  const selectedAccount = useMemo(
    () =>
      data.accounts.edges?.find((edge) => edge?.node?.id === formAccount)?.node,
    [data.accounts.edges, formAccount],
  );

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
      <SheetContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <SheetHeader>
              <SheetTitle>New Expense</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <SelectAccount
              control={form.control}
              name="account"
              label="Account"
              description="Select an account"
              fragmentRef={data}
            />

            <MoneyField
              control={form.control}
              name="total"
              label="Total"
              onValueChange={(value) => form.setValue("total", value)}
              currency={selectedAccount?.currencySymbol}
              description="Total amount of the expense"
            />

            <NameField
              control={form.control}
              name="note"
              label="Note"
              placeholder="Groceries, restaurant, etc."
            />
            <SheetFooter>
              <Button type="submit" className="" disabled={isMutationInFlight}>
                Create
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default NewExpense;
