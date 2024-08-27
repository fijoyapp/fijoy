import { Accounts, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import LiquidityCard from "./liquidity/card";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

type AccountListProps = {
  accounts: Accounts;
};

export default function AccountList({ accounts }: AccountListProps) {
  const liquidities = accounts.accounts.filter((account) => {
    return account.accountType === AccountType.LIQUIDITY;
  });

  return (
    <div>
      <div>
        <div>Liquidities</div>
        <div className="py-2"></div>

        <Card className="">
          {liquidities.map((account, idx) => {
            if (idx === 0) {
              return <LiquidityCard key={account.id} account={account} />;
            }

            return (
              <>
                <Separator className="" />
                <LiquidityCard key={account.id} account={account} />
              </>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
