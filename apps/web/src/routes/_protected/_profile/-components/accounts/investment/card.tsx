import { CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/use-profile";
import { getCurrencyDisplay } from "@/lib/money";
import { getPrettyTime } from "@/lib/time";
import { ChartCandlestick } from "lucide-react";
import type { cardFragment$key } from "../__generated__/cardFragment.graphql";
import { CardFragment } from "../card-fragment";
import { useFragment } from "react-relay";

type InvestmentCardProps = {
  account: cardFragment$key;
};

export function InvestmentCard({ account }: InvestmentCardProps) {
  const { profile } = useProfile();
  const data = useFragment(CardFragment, account);
  if (!profile) {
    return null;
  }

  return (
    <CardContent className="flex items-center space-x-2.5 p-2 px-4">
      <div>
        <ChartCandlestick />
      </div>

      <div>
        <div>{data.name}</div>
        <div className="text-muted-foreground text-xs">{data.symbol}</div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col items-end">
        <div>
          {getCurrencyDisplay(
            data.balance,
            profile.currencies.split(",")[0],
            profile.locale,
            {
              compact: false,
            },
          )}
        </div>
        <div className="text-muted-foreground text-xs">
          {getPrettyTime(new Date(data.updatedAt))}
        </div>
      </div>
    </CardContent>
  );
}
