import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { newTransferFragment$key } from "./__generated__/newTransferFragment.graphql";
import { graphql } from "relay-runtime";
import { getRouteApi } from "@tanstack/react-router";
import { useFragment } from "react-relay";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SelectAccount } from "./select-account";

const formSchema = z.object({
  fromAccount: z.string(),
  toAccount: z.string(),
});

type Props = {
  fragmentRef: newTransferFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/transactions");

const fragment = graphql`
  fragment newTransferFragment on Query {
    ...selectAccountFragment
  }
`;

const NewTransfer = ({ fragmentRef }: Props) => {
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
          <SheetContent className="space-y-2">
            <SheetHeader>
              <SheetTitle>New Transfer</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <SelectAccount
                control={form.control}
                name="fromAccount"
                label="From account"
                description="Select an account"
                fragmentRef={data}
              />
              <SelectAccount
                control={form.control}
                name="toAccount"
                label="To account"
                description="Select an account"
                fragmentRef={data}
              />
            </div>
          </SheetContent>
        </Sheet>
      </form>
    </Form>
  );
};

export default NewTransfer;
