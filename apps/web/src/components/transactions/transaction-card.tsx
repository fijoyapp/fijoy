import { Transaction } from "@/gen/proto/fijoy/v1/transaction_pb";
import { CardContent } from "../ui/card";
import { ChartCandlestick } from "lucide-react";
import { getCurrencyDisplay } from "@/lib/money";
import { getPrettyTime } from "@/lib/time";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { useProfile } from "@/hooks/use-profile";
import { match } from "ts-pattern";
import { AccountSymbolType } from "@/gen/proto/fijoy/v1/account_pb";
import { Profile } from "@/gen/proto/fijoy/v1/profile_pb";
import { Fragment } from "react/jsx-runtime";

type Props = {
  transaction: Transaction;
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
        <div className="text-xs text-muted-foreground">{transaction.id}</div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col items-end">
        <ValueDisplay transaction={transaction} profile={profile} />
        <div className="text-xs text-muted-foreground">
          {getPrettyTime(timestampDate(transaction.createdAt!))}
        </div>
      </div>
    </CardContent>
  );
};

function ValueDisplay({
  transaction,
  profile,
}: {
  transaction: Transaction;
  profile: Profile;
}) {
  return (
    <Fragment>
      {match(transaction.account!.symbolType)
        .with(AccountSymbolType.UNSPECIFIED as 0, () => {
          return "Something is wrong!";
        })
        .with(AccountSymbolType.CURRENCY as 1, () => {
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
        .with(AccountSymbolType.CRYPTO as 2, () => {
          return "Unimplemented";
        })
        .with(AccountSymbolType.STOCK as 3, () => {
          return "Unimplemented";
        })
        .exhaustive()}
    </Fragment>
  );
}
