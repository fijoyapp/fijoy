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
import { Currency } from "@/gen/proto/fijoy/v1/currency_pb";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { ChevronsUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currencyCodeToName } from "@/config/currency";
import { cn } from "@/lib/utils";
import { getCurrencyDisplay } from "@/lib/money";

type CurrencyFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  currencies: Currency[];
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

  const [selectableCurrencies, setSelectableCurrencies] =
    useState<Currency[]>(currencies);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSelectableCurrencies(
      currencies.filter(
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
            {selectedCurrencies.length > 0 && (
              <>
                <br />
              </>
            )}
          </FormDescription>

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
                <CommandInput
                  value={search}
                  onValueChange={(value) => setSearch(value)}
                  placeholder="Search currency..."
                />
                <CommandEmpty>
                  Missing your currency?
                  <br /> Let us know in Discord!
                </CommandEmpty>
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
                          setSearch("");
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

          {selectedCurrencies.map((curr, idx) => {
            const locale = currencies.find(
              (currency) => currency.code === selectedCurrencies[0],
            )!.locale;
            return (
              <Card key={curr}>
                <CardHeader className="p-4">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span>
                        {currencyCodeToName(curr)} ({curr})
                      </span>

                      <span className="text-sm text-muted-foreground">
                        {getCurrencyDisplay("420", curr, locale, {
                          compact: false,
                          isDebt: false,
                        })}
                      </span>
                    </div>

                    <div className="grow"></div>

                    {idx === 0 && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          type="button"
                          className="cursor-default"
                        >
                          Default
                        </Button>
                        <div className="px-1"></div>
                      </>
                    )}

                    {idx !== 0 && allowChangeDefault && (
                      <>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedCurrencies([
                              curr,
                              ...selectedCurrencies.filter(
                                (selectedCurrency) => selectedCurrency !== curr,
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
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          setSelectedCurrencies(
                            selectedCurrencies.filter(
                              (selectedCurrency) => selectedCurrency !== curr,
                            ),
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Trash />
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
