import { CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/use-profile";
import { getPrettyTime } from "@/lib/time";
import { ChartCandlestick } from "lucide-react";
import type { cardFragment$key } from "../__generated__/cardFragment.graphql";
import { CardFragment } from "../card-fragment";
import { useFragment } from "react-relay";
import currency from "currency.js";
import { useFormat } from "@/hooks/use-format";

type InvestmentCardProps = {
  account: cardFragment$key;
};

export function InvestmentCard({ account }: InvestmentCardProps) {
  const { profile } = useProfile();
  const data = useFragment(CardFragment, account);
  const { getCurrencyDisplay } = useFormat();

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
        <div className="text-muted-foreground text-xs">
          {data.currencySymbol}
        </div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col items-end">
        <div>
          {getCurrencyDisplay(
            currency(data.value).multiply(currency(data.amount)).toString(),
            data.currencySymbol,
          )}
        </div>
        <div className="text-muted-foreground text-xs">
          {getPrettyTime(new Date(data.updateTime))}
        </div>
      </div>
    </CardContent>
  );
}
