import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Currencies, Currency } from "@/gen/proto/fijoy/v1/currency_pb";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { ChevronsUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currencyCodeToName } from "@/config/currency";
import { cn } from "@/lib/utils";

type CurrencyFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  currencies: Currencies;
  onValueChange: (value: string[]) => void;
  defaultValues?: string[];
};

export function CurrencyField<T extends FieldValues>({
  control,
  name,
  currencies,
  onValueChange,
  defaultValues,
}: CurrencyFieldProps<T>) {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(
    defaultValues || [],
  );

  const allowChangeDefault = defaultValues === undefined;

  const [selectableCurrencies, setSelectableCurrencies] = useState<Currency[]>(
    currencies.currencies,
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectableCurrencies(
      currencies.currencies.filter(
        (currency) => !selectedCurrencies.includes(currency.code),
      ),
    );
    onValueChange(selectedCurrencies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrencies]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Currency Configuration</FormLabel>
          <FormDescription>
            Your net worth will be displayed in the default currency
          </FormDescription>

          {selectedCurrencies.map((currency, idx) => (
            <Card key={currency}>
              <CardHeader className="p-4">
                <div className="flex items-center">
                  <span>
                    {currencyCodeToName(currency)} ({currency})
                  </span>

                  {idx === 0 && (
                    <>
                      <div className="px-1"></div>
                      <Badge variant="secondary">Default</Badge>
                    </>
                  )}

                  <div className="grow"></div>

                  {idx !== 0 && allowChangeDefault && (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedCurrencies([
                            currency,
                            ...selectedCurrencies.filter(
                              (selectedCurrency) =>
                                selectedCurrency !== currency,
                            ),
                          ]);
                        }}
                      >
                        Set Default
                      </Button>
                      <div className="px-1"></div>
                    </>
                  )}
                  {(allowChangeDefault || idx !== 0) && (
                    <div
                      onClick={() =>
                        setSelectedCurrencies(
                          selectedCurrencies.filter(
                            (selectedCurrency) => selectedCurrency !== currency,
                          ),
                        )
                      }
                      className="cursor-pointer"
                    >
                      <Trash />
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  Add a currency
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command
                filter={(value, search) => {
                  const extendValue = value + " " + currencyCodeToName(value);
                  if (extendValue.toLowerCase().includes(search.toLowerCase()))
                    return 1;
                  return 0;
                }}
              >
                <CommandInput placeholder="Search currency..." />
                <CommandEmpty>No currency found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {selectableCurrencies.map((currency) => (
                      <CommandItem
                        key={currency.code}
                        value={currency.code}
                        onSelect={(currencyCode) => {
                          setSelectedCurrencies([
                            ...selectedCurrencies,
                            currencyCode,
                          ]);
                        }}
                      >
                        {currencyCodeToName(currency.code)} ({currency.code})
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
