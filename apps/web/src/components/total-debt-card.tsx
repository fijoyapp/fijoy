import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
import { useWorkspace } from "@/hooks/use-workspace";
import currency from "currency.js";

type CardProps = {
  accounts: Account[];
};

export const TotalDebtCard = ({ accounts }: CardProps) => {
  const { workspace } = useWorkspace();
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardDescription>Total Debt</CardDescription>
        <CardTitle className="font-roboto-mono">
          {currencyToDisplay(
            accounts
              .filter(
                (a) =>
                  a.accountType !== AccountType.UNSPECIFIED &&
                  accountTypeConfigMap[a.accountType].isDebt,
              )
              .reduce((acc, cur) => {
                if (!cur.balance) return acc;
                return acc.add(moneyToCurrency(cur.balance));
              }, currency(0)),
            workspace.primaryCurrency,
            { compact: true, locale: workspace.locale, isDebt: true },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
