import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Coins, CreditCard, PiggyBank, Wallet } from "lucide-react";
import { getOverallStats } from "@/lib/account";
import { getCurrencyDisplay } from "@/lib/money";
import { useProfile } from "@/hooks/use-profile";
import { useMemo } from "react";
import currency from "currency.js";
import { accountsFragment$data } from "@/routes/_protected/_profile/accounts/__generated__/accountsFragment.graphql";

type Props = {
  accounts: accountsFragment$data;
};

const NetWorthInfo = ({ accounts }: Props) => {
  const { asset, netWorth, liability } = useMemo(
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
              profile.currencies.split(",")[0],
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
              profile.currencies.split(",")[0],
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
              profile.currencies.split(",")[0],
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
          <CardTitle>
            {netWorth
              .multiply(100)
              .divide(currency(profile.netWorthGoal))
              .toString()}
            %
          </CardTitle>
          <CardDescription>
            {getCurrencyDisplay(
              profile.netWorthGoal.toString(),
              profile.currencies.split(",")[0],
              profile.locale,
              { compact: false, isDebt: false },
            )}{" "}
            Goal
          </CardDescription>
        </CardHeader>

        <div className="grow"></div>
        <PiggyBank />
        <div className="px-4"></div>
      </Card>
    </div>
  );
};

export default NetWorthInfo;
