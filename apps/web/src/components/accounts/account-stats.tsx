import currency from "currency.js";
import { Banknote, CandlestickChart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { calculateStats, currencyToDisplay } from "@/lib/money";
import { useWorkspace } from "@/hooks/use-workspace";

interface AccountStatsProps {
  accounts: Account[];
}

export function AccountStats({ accounts }: AccountStatsProps) {
  const debt = calculateStats(accounts, true);
  const assets = calculateStats(accounts, false);
  const networth = assets.subtract(debt.multiply(currency(-1)));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <CardStats
        title="Total Networth"
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
      />
    </div>
  );
}

interface CardStatsProps {
  title: string;
  icon: JSX.Element;
  value: currency;
}

const CardStats = ({ value, title, icon }: CardStatsProps) => {
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
        <h3 className="font-roboto-mono text-xl font-semibold leading-none tracking-tight ">
          {currencyToDisplay(value, workspace.primaryCurrency, {
            compact: true,
            locale: workspace.locale,
          })}
        </h3>
      </CardContent>
    </Card>
  );
};
