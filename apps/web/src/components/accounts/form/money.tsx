import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { useProfile } from "@/hooks/use-profile";
import { cn } from "@/lib/utils";

type MoneyFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  currency: string;
  onValueChange: (value: string) => void;
  description?: string;
};

export function MoneyField<T extends FieldValues>({
  control,
  name,
  label,
  currency,
  onValueChange,
  description,
}: MoneyFieldProps<T>) {
  const { profile } = useProfile();
  if (!profile) {
    return null;
  }

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
                "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              )}
              name="input-name"
              value={field.value}
              placeholder="Please enter a number"
              onValueChange={(value) => onValueChange(value || "")}
              intlConfig={{
                locale: profile.locale,
                currency,
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
