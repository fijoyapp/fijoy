import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Navigate, useRouter } from "@tanstack/react-router";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRENCIES, currencyCodeToName } from "@/config/currency";
import { ScrollArea } from "../ui/scroll-area";
import { CurrencyLocaleStepData } from "@/types/setup";
import { useSetupStore } from "@/store/setup";
import { getUserLocales, localeCodeToName } from "@/config/locale";
import { currencyToDisplay } from "@/lib/money";
import currency from "currency.js";

const formSchema = CurrencyLocaleStepData;

const CurrencyLocaleStep = () => {
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const {
    nameNamespaceStepData,
    currencyLocaleStepData,
    setCurrencyLocaleStepData,
  } = useSetupStore((state) => ({
    nameNamespaceStepData: state.nameNamespaceStepData,
    currencyLocaleStepData: state.currencyLocaleStepData,
    setCurrencyLocaleStepData: state.setCurrencyLocaleStepData,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: !currencyLocaleStepData
      ? { locale: navigator.language }
      : currencyLocaleStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrencyLocaleStepData(values);
    router.navigate({
      from: "/setup",
      search: { step: "final" },
    });
  }

  function onBack() {
    setCurrencyLocaleStepData(form.getValues());
    router.navigate({
      from: "/setup",
      search: { step: "name-namespace" },
    });
  }

  return (
    <>
      {!nameNamespaceStepData && (
        <Navigate to="/setup" search={{ step: "name-namespace" }} />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="primaryCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Currency</FormLabel>
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
                      <PopoverContent className="w-[360px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search currency..." />
                          <CommandList>
                            <CommandEmpty>No currency found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea>
                                {CURRENCIES.map((currency) => {
                                  const currencyName = `${currencyCodeToName(currency)} (${currency})`;
                                  return (
                                    <CommandItem
                                      value={currencyName}
                                      key={currencyName}
                                      onSelect={() => {
                                        form.setValue(
                                          "primaryCurrency",
                                          currency,
                                        );
                                        setPopoverOpen(false)
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
                  Statistics like net worth etc. will be shown in this currency.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Locale</FormLabel>
                <FormDescription>
                  {form.watch("primaryCurrency") && field.value && (
                    <>
                      Preview: 420 {form.watch("primaryCurrency")} will be
                      displayed as{" "}
                      {currencyToDisplay(
                        currency("420"),
                        form.getValues("primaryCurrency"),
                        {
                          locale: field.value,
                          compact: false,
                        },
                      )}
                    </>
                  )}
                </FormDescription>
                <FormControl>
                  <div>
                    <Popover>
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
                            ? `${localeCodeToName(field.value).unwrapOr("Unknown")} (${field.value})`
                            : "Select locale"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[360px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search locale..." />
                          <CommandList>
                            <CommandEmpty>No locale found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea>
                                {getUserLocales().map((lc) => {
                                  const localeDisplay = `${localeCodeToName(lc).unwrapOr("Unknown")} (${lc})`;
                                  return (
                                    <CommandItem
                                      value={localeDisplay}
                                      key={localeDisplay}
                                      onSelect={() => {
                                        form.setValue("locale", lc);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          lc === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {localeDisplay}
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
                  This will have an effect on how currencies are formatted.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <Button className="col-span-1" variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" className="col-span-2">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CurrencyLocaleStep;
