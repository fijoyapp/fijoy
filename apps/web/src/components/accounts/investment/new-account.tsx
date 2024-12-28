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
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import {
  createAccount,
  getAccounts,
} from "@/gen/proto/fijoy/v1/account-AccountService_connectquery";
import {
  AccountSymbolType,
  AccountType,
} from "@/gen/proto/fijoy/v1/account_pb";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  getTransactions,
} from "@/gen/proto/fijoy/v1/transaction-TransactionService_connectquery";
import { AmountField } from "../form/amount";
import { match } from "ts-pattern";

const formSchema = z.object({
  symbol: z.string(),
  amount: z.string(),
  type: z.enum(["crypto", "stock"]),
});

export function NewInvestment() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "stock",
    },
  });

  const createAccountMut = useMutation(createAccount, {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey({
          schema: getAccounts,
          cardinality: "finite",
        }),
      });
      router.navigate({
        to: "/accounts",
      });
    },
  });

  const createTransactionMut = useMutation(createTransaction, {
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey({
          schema: getAccounts,
          cardinality: "finite",
        }),
      });
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey({
          schema: getTransactions,
          cardinality: "finite",
        }),
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      async () => {
        const account = await createAccountMut.mutateAsync({
          name: values.symbol,
          accountType: AccountType.INVESTMENT,

          symbol: values.symbol,
          symbolType: match(values.type)
            .with("stock", () => AccountSymbolType.STOCK)
            .with("crypto", () => AccountSymbolType.CRYPTO)
            .exhaustive(),
        });

        await createTransactionMut.mutateAsync({
          accountId: account.id,
          amount: values.amount,
          note: "Initial balance",
        });
        return account;
      },
      {
        success: () => {
          return "Account created";
        },
        loading: "Creating account...",
        error: (e: Error) => `Error creating account: ${e.toString()}`,
      },
    );
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

          <Button className="ml-auto">Create</Button>
        </form>
      </Form>
    </div>
  );
}
