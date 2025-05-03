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
import { useFragment, useLazyLoadQuery } from "react-relay";
import { accountsQuery } from "./__generated__/accountsQuery.graphql";
import { accountsFragment$key } from "./__generated__/accountsFragment.graphql";

const accountsRouteSchema = z.object({
  add: AccountTypeEnum.optional(),
  detail: z.string().startsWith("account_").optional(),
});

const AccountsQuery = graphql`
  query accountsQuery {
    accounts {
      ...accountsFragment
    }
  }
`;

export const Route = createFileRoute("/_protected/_profile/accounts/")({
  // loaderDeps: ({ search}) => ({ search }),
  validateSearch: (search) => {
    return accountsRouteSchema.parse(search);
  },
  // loader: (opts) => {
  //   opts.context.queryClient.ensureQueryData(
  //     getAccountsQueryOptions({
  //       context: opts.context,
  //     }),
  //   );
  // },
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  // const context = Route.useRouteContext();
  // const { data: accountList } = useSuspenseQuery(
  //   getAccountsQueryOptions({ context }),
  // );
  const { add, detail } = Route.useSearch();

  const data = useLazyLoadQuery<accountsQuery>(AccountsQuery, {});

  return (
    <>
      {add ? (
        <AddAccount type={add} />
      ) : (
        <AccountsView accounts={data.accounts} detail={detail} />
      )}
    </>
  );
}

const AccountsFragment = graphql`
  fragment accountsFragment on Account @relay(plural: true) {
    ...cardFragment
    id
    accountType
    balance
  }
`;

type AccountsViewProps = {
  accounts: accountsFragment$key;
  detail?: string;
};

function AccountsView({ accounts, detail }: AccountsViewProps) {
  const isDesktop = useMediaQuery(WIDTH_OPTIONS.lg);
  const sidePanelActive = detail !== undefined;

  const data = useFragment(AccountsFragment, accounts);

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

        <AccountListView accounts={data} />
      </div>

      {isDesktop && <Separator orientation="vertical" className="min-h-full" />}

      <div
        className={cn(
          "scrollbar h-full w-full overflow-y-scroll p-4 lg:p-6",
          !sidePanelActive && !isDesktop ? "hidden w-1/2" : "",
        )}
      >
        <NetWorthInfo accounts={data} />
        {/* <div className="py-2"></div> */}
      </div>
    </div>
  );
}
