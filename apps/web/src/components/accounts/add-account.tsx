import { Link } from "@tanstack/react-router";
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
import { AccountType } from "@/types/account";
import { getAccountTypeDetail } from "@/config/account";

type AddAccountProps = {
  type: AccountType;
};

export default function AddAccount({ type }: AddAccountProps) {
  const accountTypeDetail = getAccountTypeDetail(type);
  return (
    <div className="max-w-(--breakpoint-sm) p-4 lg:p-6">
      <Breadcrumb>
        <BreadcrumbList className="text-muted-foreground text-lg font-semibold md:text-2xl">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={"/accounts"}>Accounts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-semibold">
              Add {accountTypeDetail.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-muted-foreground text-sm">
        {accountTypeDetail.description}
      </p>

      <div className="py-2"></div>

      {match(type)
        .with("liquidity", () => <NewLiquidity />)
        .with("investment", () => <NewInvestment />)
        .with("property", () => <NewProperty />)
        .with("receivable", () => <NewReceivable />)
        .with("liability", () => <NewLiability />)
        .exhaustive()}
    </div>
  );
}
