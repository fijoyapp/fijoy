import { Button } from "@/components/ui/button";
import CurrencyInput from "react-currency-input-field";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "@tanstack/react-router";
import { useAccountsStore } from "@/store/accounts";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { type TypeOf } from "zod";
import { CurrencyBalanceStepData } from "@/types/account";
import { ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { currencyCodeToName } from "@/config/currency";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = CurrencyBalanceStepData;

const CurrencyBalanceStep = ({ className }: ComponentProps<"form">) => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const {
    nameTypeInstitutionStepData,
    currencyBalanceStepData,
    setBalanceStepData,
  } = useAccountsStore((state) => ({
    nameTypeInstitutionStepData: state.nameTypeInstitutionStepData,
    currencyBalanceStepData: state.currencyBalanceStepData,
    setBalanceStepData: state.setCurrencyBalanceStepData,
  }));

  const form = useForm<TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currencyBalanceStepData ?? {
      balance: "0",
      currencyCode: workspace.supportedCurrencies[0],
    },
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

  function onSubmit(values: TypeOf<typeof formSchema>) {
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
          name="currencyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <div>
                  <Popover
                    open={popoverOpen}
                    onOpenChange={(open) => setPopoverOpen(open)}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? `${currencyCodeToName(field.value)} (${field.value})`
                          : "Select currency"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Command
                        filter={(value, search) =>
                          value.toLowerCase().includes(search.toLowerCase())
                            ? 1
                            : 0
                        }
                      >
                        <CommandInput placeholder="Search..." />
                        <CommandList>
                          <CommandEmpty>No currency found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea>
                              {workspace.supportedCurrencies.map((currency) => {
                                const currencyName = `${currencyCodeToName(currency)} (${currency})`;
                                return (
                                  <CommandItem
                                    value={currencyName}
                                    key={currencyName}
                                    onSelect={() => {
                                      form.setValue("currencyCode", currency);
                                      setPopoverOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        currency === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {currencyName}
                                  </CommandItem>
                                );
                              })}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormDescription>
                What currency is this account in?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  intlConfig={{
                    currency: form.getValues("currencyCode"),
                    locale: workspace.locale,
                  }}
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

        <Button variant="secondary" type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CurrencyBalanceStep;
