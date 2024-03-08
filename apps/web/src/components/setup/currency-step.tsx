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
import { useRouter } from "@tanstack/react-router";
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
import { CurrencyStepData } from "@/types/setup";
import { useSetupStore } from "@/store/setup";

const formSchema = CurrencyStepData;

const CurrencyStep = () => {
  const router = useRouter();

  const { generalStepData, currencyStepData, setCurrencyStepData } =
    useSetupStore((state) => ({
      generalStepData: state.generalStepData,
      currencyStepData: state.currencyStepData,
      setCurrencyStepData: state.setCurrencyStepData,
    }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currencyStepData,
  });

  if (!generalStepData) {
    router.navigate({
      from: "/setup",
      search: { step: "general" },
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrencyStepData(values);
    router.navigate({
      from: "/setup",
      search: { step: "final" },
    });
  }

  function onBack() {
    setCurrencyStepData(form.getValues());
    router.navigate({
      from: "/setup",
      search: { step: "general" },
    });
  }

  return (
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
                          ? `${currencyCodeToName(field.value)} (${field.value})`
                          : "Select currency"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[360px] p-0" align="start">
                      <Command
                        filter={(value, search) => {
                          if (
                            value.toLowerCase().includes(search.toLowerCase())
                          )
                            return 1;
                          return 0;
                        }}
                      >
                        <CommandInput placeholder="Search currency..." />
                        <CommandList>
                          <CommandEmpty>No currency found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea>
                              {CURRENCIES.map((currency) => (
                                <CommandItem
                                  value={`${currencyCodeToName(currency)} (${currency})`}
                                  key={currency}
                                  onSelect={() => {
                                    form.setValue("primaryCurrency", currency);
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
                                  {`${currencyCodeToName(currency)} (${currency})`}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormDescription>
                Statistics like net worth etc. will be shown in this currency
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
  );
};

export default CurrencyStep;
