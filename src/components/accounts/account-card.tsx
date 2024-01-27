import { type SelectAccount } from "@/types/account";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMoneyDisplay } from "@/lib/money";
import { accountTypeConfig, institutionConfig } from "@/config/account";
import { getPrettyTime } from "@/lib/time";
import { Link, useParams } from "@tanstack/react-router";

type Props = {
  account: SelectAccount;
};

const AccountCard = ({ account }: Props) => {
  const params = useParams({ from: "/_protected/workspace/$namespace/" });
  return (
    <Link
      to={"/workspace/$namespace/accounts/$accountId"}
      params={{
        namespace: params.namespace,
        accountId: account.ID,
      }}
    >
      <Card className="flex items-center border-2 bg-primary-foreground transition-all duration-300 hover:border-primary">
        <div className="flex w-full flex-row items-center gap-2 p-4 sm:gap-4 sm:p-6">
          <Avatar className="">
            <AvatarImage
              src={institutionConfig[account.Institution]?.logo}
              alt={account.Institution}
              className=""
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="grow">
            <div className="flex">
              <CardTitle className="text-md sm:text-lg">
                {account.Name}
              </CardTitle>
              <div className="grow"></div>
              <CardTitle className="text-md text-right sm:text-lg">
                {getMoneyDisplay(account.Balance, {
                  isDebt: accountTypeConfig[account.AccountType].isDebt,
                })}
              </CardTitle>
            </div>
            <div className="flex">
              <CardDescription className="text-xs sm:text-sm">
                {institutionConfig[account.Institution].name}
              </CardDescription>
              <div className="grow"></div>
              <CardDescription className="text-xs sm:text-sm">
                {getPrettyTime(account.UpdatedAt)}
              </CardDescription>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AccountCard;
