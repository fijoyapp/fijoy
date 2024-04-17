import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { useWorkspace } from "@/hooks/use-workspace";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
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
            workspace.primaryCurrency,
            { compact: true, locale: workspace.locale },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
