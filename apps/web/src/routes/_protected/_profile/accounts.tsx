import { createFileRoute, Link } from "@tanstack/react-router";
import { AccountTypeEnum } from "@/types/account";
import { z } from "zod";
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
import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import {
  ChartCandlestick,
  CreditCard,
  HandCoins,
  House,
  PiggyBank,
} from "lucide-react";
import AddAccount from "@/components/accounts/add-account";
import { useMediaQuery, WIDTH_OPTIONS } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import NetWorthInfo from "@/components/accounts/net-worth-info";
import AccountListView from "@/components/accounts/account-list-view";
import { graphql } from "relay-runtime";
import { usePreloadedQuery, useRefetchableFragment } from "react-relay";
import { RootQuery } from "@/routes/__generated__/RootQuery.graphql";
import { rootQuery } from "@/routes/__root";
import {
  accountsPageFragment$data,
  accountsPageFragment$key,
} from "./__generated__/accountsPageFragment.graphql";
import { AccountsPageRefetch } from "./__generated__/AccountsPageRefetch.graphql";

const accountsRouteSchema = z.object({
  add: AccountTypeEnum.optional(),
  detail: z.string().startsWith("account_").optional(),
});

const AccountsPageFragment = graphql`
  fragment accountsPageFragment on Query
  @refetchable(queryName: "AccountsPageRefetch") {
    accounts {
      id
      accountType
      balance
      ...cardFragment
    }
  }
`;

export const Route = createFileRoute("/_protected/_profile/accounts")({
  // loaderDeps: ({ search}) => ({ search }),
  validateSearch: (search) => {
    return accountsRouteSchema.parse(search);
  },
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const { add, detail } = Route.useSearch();
  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fragmentData, _] = useRefetchableFragment<
    AccountsPageRefetch,
    accountsPageFragment$key
  >(AccountsPageFragment, data);

  return (
    <>
      {add ? (
        <AddAccount type={add} />
      ) : (
        <AccountsView accounts={fragmentData.accounts} detail={detail} />
      )}
    </>
  );
}

type AccountsViewProps = {
  accounts: accountsPageFragment$data["accounts"];
  detail?: string;
};

function AccountsView({ accounts, detail }: AccountsViewProps) {
  const isDesktop = useMediaQuery(WIDTH_OPTIONS.lg);
  const sidePanelActive = detail !== undefined;

  return (
    <div className={cn("flex min-h-full w-full", isDesktop ? "" : "")}>
      <div
        className={cn(
          "scrollbar h-full w-full overflow-y-scroll p-4 lg:p-6",
          sidePanelActive && !isDesktop ? "hidden w-1/2" : "",
        )}
      >
        <PageHeader>
          <PageHeaderHeading>Accounts</PageHeaderHeading>
          <PageHeaderDescription>
            View and manage your accounts
          </PageHeaderDescription>
        </PageHeader>

        <div className="py-2"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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

        <AccountListView accounts={accounts} />
      </div>

      {isDesktop && <Separator orientation="vertical" className="min-h-full" />}

      <div
        className={cn(
          "scrollbar h-full w-full overflow-y-scroll p-4 lg:p-6",
          !sidePanelActive && !isDesktop ? "hidden w-1/2" : "",
        )}
      >
        <NetWorthInfo accounts={accounts} />
        {/* <div className="py-2"></div> */}
      </div>
    </div>
  );
}
