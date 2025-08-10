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
import { useProfile } from "@/hooks/use-profile";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { selectAccountFragment$key } from "./__generated__/selectAccountFragment.graphql";
import invariant from "tiny-invariant";
import { getCurrencyDisplay } from "@/lib/money";

type SelectAccountProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description: string;
  fragmentRef: selectAccountFragment$key;
};

const fragment = graphql`
  fragment selectAccountFragment on Query {
    accounts(first: 20) {
      edges {
        node {
          id @required(action: THROW)
          name
          amount
          currencySymbol
        }
      }
    }
  }
`;

export function SelectAccount<T extends FieldValues>({
  control,
  name,
  label,
  description,
  fragmentRef,
}: SelectAccountProps<T>) {
  const { profile } = useProfile();

  const data = useFragment(fragment, fragmentRef);

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
              {data.accounts.edges?.map((account) => {
                invariant(account?.node?.id);
                return (
                  <SelectItem key={account.node.id} value={account.node.id}>
                    {account.node.name} (
                    {getCurrencyDisplay(
                      account.node.amount.toString(),
                      account.node.currencySymbol,
                      profile.locale,
                      { compact: false },
                    )}
                    )
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
