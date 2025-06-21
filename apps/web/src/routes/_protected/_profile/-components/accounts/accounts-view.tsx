import { Link } from "@tanstack/react-router";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChartCandlestick,
  CreditCard,
  HandCoins,
  House,
  PiggyBank,
} from "lucide-react";
import { useMediaQuery, WIDTH_OPTIONS } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { graphql } from "relay-runtime";
import type { accountsViewFragment$key } from "./__generated__/accountsViewFragment.graphql";
import { useFragment } from "react-relay";
import AccountListView from "./account-list-view";
import NetWorthInfo from "./net-worth-info";

type AccountsViewProps = {
  accountsViewFragment: accountsViewFragment$key;
  detail?: string;
};

const AccountsViewFragment = graphql`
  fragment accountsViewFragment on Query {
    ...netWorthInfoFragment
    ...accountListViewFragment
  }
`;

export function AccountsView({
  detail,
  accountsViewFragment,
}: AccountsViewProps) {
  const isDesktop = useMediaQuery(WIDTH_OPTIONS.lg);
  const sidePanelActive = detail !== undefined;

  const data = useFragment(AccountsViewFragment, accountsViewFragment);

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
            <Link to={"/accounts"} search={{ add: "liquidity" }}>
              <DropdownMenuItem>
                <PiggyBank className="mr-2 h-4 w-4" />
                <span>Liquitity</span>
              </DropdownMenuItem>
            </Link>
            <Link to={"/accounts"} search={{ add: "investment" }}>
              <DropdownMenuItem>
                <ChartCandlestick className="mr-2 h-4 w-4" />
                <span>Investment</span>
              </DropdownMenuItem>
            </Link>
            <Link to={"/accounts"} search={{ add: "property" }}>
              <DropdownMenuItem>
                <House className="mr-2 h-4 w-4" />
                <span>Property</span>
              </DropdownMenuItem>
            </Link>
            <Link to={"/accounts"} search={{ add: "receivable" }}>
              <DropdownMenuItem>
                <HandCoins className="mr-2 h-4 w-4" />
                <span>Receivable</span>
              </DropdownMenuItem>
            </Link>
            <Link to={"/accounts"} search={{ add: "liability" }}>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Liability</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="py-2"></div>

        <AccountListView accountListViewFragment={data} />
      </div>

      {isDesktop && <Separator orientation="vertical" className="min-h-full" />}

      <div
        className={cn(
          "scrollbar h-full w-full overflow-y-scroll p-4 lg:p-6",
          !sidePanelActive && !isDesktop ? "hidden w-1/2" : "",
        )}
      >
        <NetWorthInfo netWorthInfoFragment={data} />
        {/* <div className="py-2"></div> */}
      </div>
    </div>
  );
}
