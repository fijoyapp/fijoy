import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { cn } from "@/lib/utils";

type MoneyFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  onValueChange: (value: string) => void;
  description?: string;
};

export function AmountField<T extends FieldValues>({
  control,
  name,
  label,
  onValueChange,
  description,
}: MoneyFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <FormControl>
            <CurrencyInput
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              )}
              name="input-name"
              value={field.value}
              placeholder="Please enter a number"
              onValueChange={(value) => onValueChange(value || "")}
              decimalsLimit={8}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
