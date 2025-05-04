import { CardContent } from "../ui/card";
import { ChartCandlestick } from "lucide-react";
import { getCurrencyDisplay } from "@/lib/money";
import { getPrettyTime } from "@/lib/time";
import { useProfile } from "@/hooks/use-profile";
import { match } from "ts-pattern";
import { Fragment } from "react/jsx-runtime";
import { profileQuery } from "@/lib/queries/__generated__/profileQuery.graphql";
import { transactionsFragment$data } from "@/routes/_protected/_profile/transactions/__generated__/transactionsFragment.graphql";

type Props = {
  transaction: transactionsFragment$data[number];
};

export const TransactionCard = ({ transaction }: Props) => {
  const { profile } = useProfile();
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
        <div className="text-muted-foreground text-xs">{transaction.id}</div>
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
  transaction: transactionsFragment$data[number];
  profile: profileQuery["response"]["profile"];
}) {
  return (
    <Fragment>
      {match(transaction.account.symbolType)
        .with("%future added value", () => {
          return "Something is wrong!";
        })
        .with("currency", () => {
          return getCurrencyDisplay(
            transaction.amount,
            transaction.account!.symbol,
            profile.locale,
            {
              compact: false,
              isDebt: false,
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
