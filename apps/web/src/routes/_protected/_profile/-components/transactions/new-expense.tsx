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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SelectAccount } from "./select-account";

const formSchema = z.object({
  account: z.string(),
});

type Props = {
  fragmentRef: newExpenseFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/transactions");

const fragment = graphql`
  fragment newExpenseFragment on Query {
    ...selectAccountFragment
  }
`;

const NewExpense = ({ fragmentRef }: Props) => {
  const { add } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.info(values);
  }
  const data = useFragment(fragment, fragmentRef);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          </SheetContent>
        </Sheet>
      </form>
    </Form>
  );
};

export default NewExpense;
