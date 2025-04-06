import { Link, Navigate } from "@tanstack/react-router";
import { AccountTypeEnum } from "@/types/account";
import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { getAccountTypeDetail } from "@/config/account";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { match } from "ts-pattern";
import { NewLiquidity } from "@/components/accounts/liquidity/new-account";
import { NewInvestment } from "@/components/accounts/investment/new-account";
import { NewProperty } from "@/components/accounts/property/new-account";
import { NewReceivable } from "@/components/accounts/receivable/new-account";
import { NewLiability } from "@/components/accounts/liability/new-account";

type AddAccountProps = {
  type: AccountTypeEnum;
};

export default function AddAccount({ type }: AddAccountProps) {
  const accountTypeDetail = getAccountTypeDetail(type);
  return (
    <div className="max-w-(--breakpoint-sm) p-4 lg:p-6">
      <Breadcrumb>
        <BreadcrumbList className="text-lg font-semibold text-muted-foreground md:text-2xl">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/accounts"}>Accounts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-foreground">
              Add {accountTypeDetail.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-sm text-muted-foreground">
        {accountTypeDetail.description}
      </p>

      <div className="py-2"></div>

      {match(type)
        .with(AccountType.UNSPECIFIED as 0, () => <Navigate to={"/accounts"} />)
        .with(AccountType.LIQUIDITY as 1, () => <NewLiquidity />)
        .with(AccountType.INVESTMENT as 2, () => <NewInvestment />)
        .with(AccountType.PROPERTY as 3, () => <NewProperty />)
        .with(AccountType.RECEIVABLE as 4, () => <NewReceivable />)
        .with(AccountType.LIABILITY as 5, () => <NewLiability />)
        .exhaustive()}
    </div>
  );
}
