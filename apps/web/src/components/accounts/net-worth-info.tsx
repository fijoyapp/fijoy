import { Accounts } from "@/gen/proto/fijoy/v1/account_pb";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Clock, Coins, CreditCard, Wallet } from "lucide-react";
import { getOverallStats } from "@/lib/account";
import { getCurrencyDisplay } from "@/lib/money";
import { useProfile } from "@/hooks/use-profile";
import { getPrettyTime } from "@/lib/time";
import { useMemo } from "react";

type Props = {
  accounts: Accounts;
};

const NetWorthInfo = ({ accounts }: Props) => {
  const { asset, netWorth, liability, lastUpdatedTimestamp } = useMemo(
    () => getOverallStats(accounts),
    [accounts],
  );

  const { profile } = useProfile();
  if (!profile) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>
            {getCurrencyDisplay(
              asset.toString(),
              profile.currencies[0],
              profile.locale,
              { compact: false },
            )}
          </CardTitle>
          <CardDescription>Asset</CardDescription>
        </CardHeader>
        <div className="grow"></div>
        <Wallet />
        <div className="px-4"></div>
      </Card>
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>
            {getCurrencyDisplay(
              liability.toString(),
              profile.currencies[0],
              profile.locale,
              { compact: false, isDebt: true },
            )}
          </CardTitle>
          <CardDescription>Liability</CardDescription>
        </CardHeader>

        <div className="grow"></div>
        <CreditCard />
        <div className="px-4"></div>
      </Card>
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>
            {getCurrencyDisplay(
              netWorth.toString(),
              profile.currencies[0],
              profile.locale,
              { compact: false },
            )}
          </CardTitle>
          <CardDescription>Net Worth</CardDescription>
        </CardHeader>

        <div className="grow"></div>
        <Coins />
        <div className="px-4"></div>
      </Card>
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>{getPrettyTime(lastUpdatedTimestamp.toDate())}</CardTitle>
          <CardDescription>Last Updated</CardDescription>
        </CardHeader>

        <div className="grow"></div>
        <Clock />
        <div className="px-4"></div>
      </Card>
    </div>
  );
};

export default NetWorthInfo;
