import { createFileRoute, Link } from "@tanstack/react-router";
import { AccountTypeEnum } from "@/types/account";
import { z } from "zod";
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AccountType, Accounts } from "@/gen/proto/fijoy/v1/account_pb";
import { getAccountTypeDetail } from "@/lib/convert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ChartCandlestick,
  CreditCard,
  HandCoins,
  House,
  PiggyBank,
} from "lucide-react";

const setupNewAccountSchema = z.object({
  add: AccountTypeEnum.optional(),
});

export const Route = createFileRoute("/_protected/_profile/accounts/")({
  // loaderDeps: ({ search}) => ({ search }),
  validateSearch: (search) => {
    return setupNewAccountSchema.parse(search);
  },
  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      getAccountsQueryOptions({
        context: opts.context,
      }),
    );
  },
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const context = Route.useRouteContext();
  const { data } = useSuspenseQuery(getAccountsQueryOptions({ context }));
  const { add } = Route.useSearch();

  return (
    <>{add ? <AddAccount type={add} /> : <AccountsView accounts={data} />}</>
  );
}

type AccountsViewProps = {
  accounts: Accounts;
};

function AccountsView({ accounts }: AccountsViewProps) {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Accounts</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage your accounts
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2"></div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>New Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select a type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={"/accounts"} search={{ add: AccountType.LIQUIDITY }}>
            <DropdownMenuItem>
              <PiggyBank className="mr-2 h-4 w-4" />
              <span>Liquitity</span>
            </DropdownMenuItem>
          </Link>
          <Link to={"/accounts"} search={{ add: AccountType.INVESTMENT }}>
            <DropdownMenuItem>
              <ChartCandlestick className="mr-2 h-4 w-4" />
              <span>Investment</span>
            </DropdownMenuItem>
          </Link>
          <Link to={"/accounts"} search={{ add: AccountType.PROPERTY }}>
            <DropdownMenuItem>
              <House className="mr-2 h-4 w-4" />
              <span>Property</span>
            </DropdownMenuItem>
          </Link>
          <Link to={"/accounts"} search={{ add: AccountType.RECEIVABLE }}>
            <DropdownMenuItem>
              <HandCoins className="mr-2 h-4 w-4" />
              <span>Receivable</span>
            </DropdownMenuItem>
          </Link>
          <Link to={"/accounts"} search={{ add: AccountType.LIABILITY }}>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Liability</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="py-2"></div>
    </div>
  );
}

type AddAccountProps = {
  type: AccountTypeEnum;
};

function AddAccount({ type }: AddAccountProps) {
  const accountTypeDetail = getAccountTypeDetail(type);
  return (
    <div>
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
    </div>
  );
}
