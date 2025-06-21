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
import { AccountType } from "@/types/account";
import { getAccountTypeDetail } from "@/config/account";
import { NewLiquidity } from "./liquidity/new-account";
import { NewInvestment } from "./investment/new-account";
import { NewProperty } from "./property/new-account";
import { NewReceivable } from "./receivable/new-account";
import { NewLiability } from "./liability/new-account";

type AddAccountProps = {
  type: AccountType;
};

export function AddAccount({ type }: AddAccountProps) {
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
