import { ChartCandlestick } from "lucide-react";
import { getCurrencyDisplay } from "@/lib/money";
import { getPrettyTime } from "@/lib/time";
import { useProfile } from "@/hooks/use-profile";
import { match } from "ts-pattern";
import { Fragment } from "react/jsx-runtime";
import { graphql } from "relay-runtime";
import type {
  transactionCardFragment$data,
  transactionCardFragment$key,
} from "./__generated__/transactionCardFragment.graphql";
import { useFragment } from "react-relay";
import type { profileFragment$data } from "@/lib/queries/__generated__/profileFragment.graphql";
import { CardContent } from "@/components/ui/card";

type Props = {
  transactionRef: transactionCardFragment$key;
};

const TransactionCardFragment = graphql`
  fragment transactionCardFragment on Transaction {
    id
    note
    amount
    datetime
    createdAt
    updatedAt
    account {
      ticker
      tickerType
      currencySymbol
      name
    }
  }
`;

export const TransactionCard = ({ transactionRef }: Props) => {
  const { profile } = useProfile();

  const transaction = useFragment(TransactionCardFragment, transactionRef);

  if (!profile) {
    return null;
  }

  return (
    <CardContent className="flex items-center space-x-2.5 p-2 px-4">
      <div>
        <ChartCandlestick />
      </div>

      <div>
        <div>{transaction.note}</div>
        <div className="text-muted-foreground text-xs">
          {transaction.account.name}
        </div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col items-end">
        <ValueDisplay transaction={transaction} profile={profile} />
        <div className="text-muted-foreground text-xs">
          {getPrettyTime(new Date(transaction.createdAt))}
        </div>
      </div>
    </CardContent>
  );
};

function ValueDisplay({
  transaction,
  profile,
}: {
  transaction: transactionCardFragment$data;
  profile: profileFragment$data[number];
}) {
  return (
    <Fragment>
      {match(transaction.account.tickerType)
        .with("%future added value", () => {
          return "Something is wrong!";
        })
        .with("currency", () => {
          return getCurrencyDisplay(
            transaction.amount,
            transaction.account.currencySymbol,
            profile.locale,
            {
              compact: false,
            },
          );
        })
        .with("crypto", () => {
          // TODO: implement this
          return "Unimplemented";
        })
        .with("stock", () => {
          // TODO: implement this
          return "Unimplemented";
        })
        .exhaustive()}
    </Fragment>
  );
}
