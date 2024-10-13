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
import { getProfileHeader } from "@/lib/headers";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().length(3),
  balance: z.string(),
});

export function NewLiability() {
  const { profile } = useProfile();

  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: profile?.currencies[0],
    },
  });

  const createAccountMut = useMutation(createAccount, {
    callOptions: {
      headers: getProfileHeader(profile?.id ?? ""),
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey(getAccounts),
      });
      router.navigate({
        to: "/accounts",
      });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      createAccountMut.mutateAsync({
        name: values.name,
        accountType: AccountType.LIABILITY,

        includeInNetWorth: true,
        symbol: values.symbol,
        symbolType: AccountSymbolType.CURRENCY,
      }),
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
              <CardTitle>New Liability Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <NameField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Give your account a descriptive name, e.g. My Student Loan"
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
                description="Positive balance represents debt, negative balance represents asset"
              />
            </CardContent>
          </Card>

          <Button className="ml-auto">Create</Button>
        </form>
      </Form>
    </div>
  );
}
