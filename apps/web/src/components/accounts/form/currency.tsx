import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencyCodeToName } from "@/config/currency";
import { useProfile } from "@/hooks/use-profile";
import { Control, FieldValues, Path } from "react-hook-form";

type CurrencyFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export function CurrencyField<T extends FieldValues>({
  control,
  name,
  label,
}: CurrencyFieldProps<T>) {
  const { profile } = useProfile();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {profile?.currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currencyCodeToName(currency)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
