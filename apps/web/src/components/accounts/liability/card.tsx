import { CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/use-profile";
import { getCurrencyDisplay } from "@/lib/money";
import { getPrettyTime } from "@/lib/time";
import { CreditCard } from "lucide-react";
import type { cardFragment$key } from "../__generated__/cardFragment.graphql";
import { useFragment } from "react-relay";
import { CardFragment } from "../card-fragment";

type LiabilityCardProps = {
  account: cardFragment$key;
};

export function LiabilityCard({ account }: LiabilityCardProps) {
  const { profile } = useProfile();
  const data = useFragment(CardFragment, account);

  if (!profile) {
    return null;
  }

  return (
    <CardContent className="flex items-center space-x-2.5 p-2 px-4">
      <div>
        <CreditCard />
      </div>

      <div>
        <div>{data.name}</div>
        <div className="text-muted-foreground text-xs">{data.symbol}</div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col items-end">
        <div>
          {getCurrencyDisplay(data.balance, data.symbol, profile.locale, {
            compact: false,
            isDebt: true,
          })}
        </div>
        <div className="text-muted-foreground text-xs">
          {getPrettyTime(new Date(data.updatedAt))}
        </div>
      </div>
    </CardContent>
  );
}
