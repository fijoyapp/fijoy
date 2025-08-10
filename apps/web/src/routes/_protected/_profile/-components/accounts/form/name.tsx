import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldValues, Path } from "react-hook-form";

type NameFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  description?: string;
};

export function NameField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
}: NameFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <FormControl>
            <Input placeholder={placeholder} data-1p-ignore {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
