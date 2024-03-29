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

export const TotalAssetCard = ({ accounts }: CardProps) => {
  const { workspace } = useWorkspace();
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardDescription>Total Asset</CardDescription>
        <CardTitle className="font-roboto-mono">
          {currencyToDisplay(
            accounts
              .filter(
                (a) =>
                  a.accountType !== AccountType.UNSPECIFIED &&
                  !accountTypeConfigMap[a.accountType].isDebt,
              )
              .reduce((acc, cur) => {
                if (!cur.balance) return acc;
                return acc.add(
                  moneyToCurrency(cur.balance, { reverse: false }),
                );
              }, currency(0)),
            "CAD", // TODO: Use user's currency
            { compact: true, locale: workspace.locale },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
