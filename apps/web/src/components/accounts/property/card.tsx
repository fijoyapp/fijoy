import { CardContent } from "@/components/ui/card";
import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { useProfile } from "@/hooks/use-profile";
import { getCurrencyDisplay } from "@/lib/money";
import { getPrettyTime } from "@/lib/time";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { House } from "lucide-react";

type PropertyCardProps = {
  account: Account;
};

export function PropertyCard({ account }: PropertyCardProps) {
  const { profile } = useProfile();
  if (!profile) {
    return null;
  }

  return (
    <CardContent className="flex items-center space-x-2.5 p-2 px-4">
      <div>
        <House />
      </div>

      <div>
        <div>{account.name}</div>
        <div className="text-muted-foreground text-xs">{account.symbol}</div>
      </div>

      <div className="grow"></div>

      <div className="flex flex-col items-end">
        <div>
          {getCurrencyDisplay(account.balance, account.symbol, profile.locale, {
            compact: false,
            isDebt: false,
          })}
        </div>
        <div className="text-muted-foreground text-xs">
          {getPrettyTime(timestampDate(account.updatedAt!))}
        </div>
      </div>
    </CardContent>
  );
}
