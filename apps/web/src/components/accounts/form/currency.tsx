import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultiSelectFormField from "@/components/ui/multi-select";
import { CURRENCIES, currencyCodeToName } from "@/config/currency";
import { Control, FieldValues, Path } from "react-hook-form";

type CurrencyFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  // placeholder: string;
};

export function CurrencyField<T extends FieldValues>({
  control,
  name,
  label,
  // placeholder,
}: CurrencyFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelectFormField
              options={CURRENCIES.map((c) => ({
                label: `${currencyCodeToName(c)} (${c})`,
                value: c,
              }))}
              defaultValue={field.value}
              onValueChange={field.onChange}
              placeholder="Select currencies"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
