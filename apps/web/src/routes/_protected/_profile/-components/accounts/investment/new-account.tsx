import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NameField } from "../form/name";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { AmountField } from "../form/amount";
import { match } from "ts-pattern";
import { graphql } from "relay-runtime";
import { useProfile } from "@/hooks/use-profile";
import { useMutation } from "react-relay";
import type { newAccountInvestmentMutation } from "./__generated__/newAccountInvestmentMutation.graphql";

const formSchema = z.object({
  symbol: z.string(),
  amount: z.string(),
  type: z.enum(["crypto", "stock"]),
});

const NewAccountInvestmentMutation = graphql`
  mutation newAccountInvestmentMutation($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
    }
  }
`;

export function NewInvestment() {
  const { profile } = useProfile();

  const router = useRouter();
  const [commitMutation, isMutationInFlight] =
    useMutation<newAccountInvestmentMutation>(NewAccountInvestmentMutation);

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
          amount: values.amount,
          investmentType: "taxable", // TODO: customize
          accountType: "investment",
          name: values.symbol,
          ticker: values.symbol,
          tickerType: values.type,
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
      // optimisticUpdater: (store) => {},
    });
  }

  return (
    <div className="flex max-w-lg flex-col space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>New Investment Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="grow">
                  <NameField
                    control={form.control}
                    name="symbol"
                    label="Symbol"
                    placeholder="What is the symbol? e.g. AAPL"
                  />
                </div>

                <FormField
                  control={form.control}
                  name={"type"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={(value) => {
                            match(value)
                              .with("stock", () => {
                                form.setValue("type", "stock");
                              })
                              .with("crypto", () => {
                                form.setValue("type", "crypto");
                              })
                              .otherwise(() => {
                                alert("Invalid type value");
                              });
                          }}
                        >
                          <ToggleGroupItem
                            value="stock"
                            aria-label="Toggle Stock"
                          >
                            Stock
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="crypto"
                            aria-label="Toggle Crypto"
                          >
                            Crypto
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <AmountField
                control={form.control}
                name="amount"
                label="Amount"
                onValueChange={(value) => form.setValue("amount", value)}
                description="Enter how many shares do you have"
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
