import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
import { useWorkspace } from "@/workspace";
import currency from "currency.js";

type CardProps = {
  accounts: Account[];
};

export const NetWorthCard = ({ accounts }: CardProps) => {
  const { workspace } = useWorkspace();
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardDescription>Net Worth</CardDescription>
        <CardTitle className="">
          {currencyToDisplay(
            accounts.reduce((acc, cur) => {
              if (!cur.balance) return acc;
              return acc.add(moneyToCurrency(cur.balance, { reverse: false }));
            }, currency(0)),
            "CAD", // TODO: Use user's currency
            { compact: true, locale: workspace.locale },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
