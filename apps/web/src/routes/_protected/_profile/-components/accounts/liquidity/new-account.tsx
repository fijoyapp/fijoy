import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NameField } from "../form/name";
import { CurrencyField } from "../form/currency";
import { useProfile } from "@/hooks/use-profile";
import { MoneyField } from "../form/money";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import type { newAccountLiquidityMutation } from "./__generated__/newAccountLiquidityMutation.graphql";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().length(3),
  balance: z.string(),
  institution: z.string(),
});

const NewAccountLiquidityMutation = graphql`
  mutation newAccountLiquidityMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
    }
  }
`;

export function NewLiquidity() {
  const { profile } = useProfile();

  const router = useRouter();
  const [commitMutation, isMutationInFlight] =
    useMutation<newAccountLiquidityMutation>(NewAccountLiquidityMutation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: profile?.currencies[0],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    commitMutation({
      variables: {
        input: {
          amount: values.balance,
          accountType: "liquidity",
          investmentType: "taxable", // TODO: customize
          name: values.name,
          institution: values.institution,
          ticker: values.symbol,
          tickerType: "currency",
          currencySymbol: values.symbol,
        },
      },
      onCompleted(_, errors) {
        if (errors && errors.length > 0) {
          toast.error(errors.map((error) => error.message).join(", "));
        } else {
          router.navigate({
            to: "/accounts",
          });
        }
      },
    });
  }

  return (
    <div className="flex max-w-lg flex-col space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>New Liquidity Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NameField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Give your account a descriptive name, e.g. Wealthsimple Cash"
              />

              <NameField
                control={form.control}
                name="institution"
                label="Institution"
                placeholder="Which institution does this account belong to? e.g. Wealthimple"
              />

              <CurrencyField
                control={form.control}
                name="symbol"
                label="Account Currency"
                description="Note that the currency cannot be changed after account creation"
              />

              <MoneyField
                control={form.control}
                name="balance"
                label="Balance"
                currency={form.getValues("symbol")}
                onValueChange={(value) => form.setValue("balance", value)}
              />
            </CardContent>
          </Card>

          <Button className="ml-auto" disabled={isMutationInFlight}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
