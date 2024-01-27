import { type SelectAccount } from "@/types/account";
import AccountCard from "./account-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMoneyDisplay } from "@/lib/money";
import { accountTypeConfig } from "@/config/account";

type Props = {
  name: string;
  accounts: SelectAccount[];
};

const AccountSection = ({ name, accounts }: Props) => {
  if (!accounts[0]) {
    return null;
  }
  return (
    <Card className="break-inside-avoid-page bg-muted">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex">
          <CardTitle className="text-xl sm:text-2xl">{name}</CardTitle>
          <div className="grow"></div>
          <div className="text-xl  font-semibold sm:text-2xl">
            {getMoneyDisplay(
              accounts.reduce((acc, cur) => acc + cur.Balance, 0),
              {
                isDebt: accountTypeConfig[accounts[0].AccountType].isDebt,
              },
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pt-0 ">
        {accounts.map((account) => (
          <AccountCard key={account.ID} account={account} />
        ))}
      </CardContent>
    </Card>
  );
};

export default AccountSection;
