import {
  FormControl,
  FormDescription,
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
  description: string;
};

export function CurrencyField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: CurrencyFieldProps<T>) {
  const { profile } = useProfile();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {profile?.currencies.split(",").map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currencyCodeToName(currency)} ({currency})
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
