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
import type { Control, FieldValues, Path } from "react-hook-form";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { selectAccountFragment$key } from "./__generated__/selectAccountFragment.graphql";
import invariant from "tiny-invariant";
import { useFormat } from "@/hooks/use-format";

type SelectAccountProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description: string;
  fragmentRef: selectAccountFragment$key;
  currencyTickerOnly?: boolean;
};

const fragment = graphql`
  fragment selectAccountFragment on Query {
    accounts(first: 1000) {
      edges {
        node {
          id @required(action: THROW)
          name
          amount
          currencyCode
          tickerType
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
  currencyTickerOnly = true,
}: SelectAccountProps<T>) {
  const { getCurrencyDisplay } = useFormat();
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
              {data.accounts.edges
                ?.filter((account) => {
                  if (!currencyTickerOnly) {
                    return true;
                  }

                  return account?.node?.tickerType === "currency";
                })
                .map((account) => {
                  invariant(account?.node?.id);
                  return (
                    <SelectItem key={account.node.id} value={account.node.id}>
                      {account.node.name} (
                      {getCurrencyDisplay(
                        account.node.amount.toString(),
                        account.node.currencyCode,
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
