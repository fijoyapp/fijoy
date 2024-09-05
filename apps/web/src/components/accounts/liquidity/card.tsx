import { CardContent } from "@/components/ui/card";
import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { useProfile } from "@/hooks/use-profile";
import { getCurrencyDisplay } from "@/lib/money";
import { getPrettyTime } from "@/lib/time";
import { PiggyBank } from "lucide-react";

type LiquidityCardProps = {
  account: Account;
};

export function LiquidityCard({ account }: LiquidityCardProps) {
  const { profile } = useProfile();
  if (!profile) {
    return null;
  }

  return (
    <CardContent className="flex items-center space-x-2.5 p-2 px-4">
      <div>
        <PiggyBank />
      </div>

      <div>
        <div>{account.name}</div>
        <div className="text-xs text-muted-foreground">{account.symbol}</div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col items-end">
        <div>
          {getCurrencyDisplay(account.balance, account.symbol, profile.locale, {
            compact: false,
            isDebt: false,
          })}
        </div>
        <div className="text-xs text-muted-foreground">
          {getPrettyTime(account.updatedAt!.toDate())}
        </div>
      </div>
    </CardContent>
  );
}
