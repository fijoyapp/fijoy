import currency from "currency.js";
import { Banknote, CandlestickChart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { calculateStats, currencyToDisplay } from "@/lib/money";
import { useWorkspace } from "@/hooks/use-workspace";

type AccountStatsProps = {
  accounts: Account[];
};

export function AccountStats({ accounts }: AccountStatsProps) {
  const assets = calculateStats(accounts, false);
  const debt = calculateStats(accounts, true);
  const networth = assets.add(debt);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <CardStats
        title="Networth"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        value={networth}
      />
      <CardStats
        title="Total Asset"
        icon={<CandlestickChart className="h-4 w-4 text-muted-foreground" />}
        value={assets}
      />

      <CardStats
        title="Total Debt"
        icon={<Banknote className="h-4 w-4 text-muted-foreground" />}
        value={debt}
        isDebt={true}
      />
    </div>
  );
}

type CardStatsProps = {
  title: string;
  icon: JSX.Element;
  value: currency;
  isDebt?: boolean;
};

const CardStats = ({ value, title, icon, isDebt }: CardStatsProps) => {
  const { workspace } = useWorkspace();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <h3 className="font-roboto-mono text-xl font-semibold leading-none tracking-tight">
          {currencyToDisplay(value, workspace.primaryCurrency, {
            compact: true,
            locale: workspace.locale,
            isDebt: isDebt,
          })}
        </h3>
      </CardContent>
    </Card>
  );
};
