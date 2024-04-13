import { Button } from "@/components/ui/button";
import CurrencyInput from "react-currency-input-field";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "@tanstack/react-router";
import { useAccountsStore } from "@/store/accounts";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { match } from "ts-pattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BalanceStepData } from "@/types/accounts";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const formSchema = BalanceStepData;

const BalanceStep = ({ className }: ComponentProps<"form">) => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  const { nameTypeInstitutionStepData, balanceStepData, setBalanceStepData } =
    useAccountsStore((state) => ({
      nameTypeInstitutionStepData: state.nameTypeInstitutionStepData,
      balanceStepData: state.balanceStepData,
      setBalanceStepData: state.setBalanceStepData,
    }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: balanceStepData ?? { balance: 0 },
  });

  if (!nameTypeInstitutionStepData) {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "name-type-institution", "add-account": true },
    });
    return null;
  }

  function onBack() {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "name-type-institution", "add-account": true },
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setBalanceStepData(values);
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "final", "add-account": true },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-2", className)}
      >
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <CurrencyInput
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={field.value}
                  placeholder="Enter balance amount"
                  // TODO: set this dynamically
                  intlConfig={{ currency: "CAD", locale: "en-CA" }}
                  onValueChange={(value) => {
                    field.onChange(value ?? "");
                  }}
                />
              </FormControl>
              <FormDescription>
                {match(nameTypeInstitutionStepData.type)
                  .with("debt", () => (
                    <div>How much debt does this account carry?</div>
                  ))
                  .with("cash", () => (
                    <div>How much cash is in this account?</div>
                  ))
                  .with("investment", () => (
                    <div>What is the total value of the investment?</div>
                  ))
                  .with("other_asset", () => (
                    <div>
                      What is the value of {nameTypeInstitutionStepData.name}?
                    </div>
                  ))
                  .exhaustive()}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-2"></div>

        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default BalanceStep;
