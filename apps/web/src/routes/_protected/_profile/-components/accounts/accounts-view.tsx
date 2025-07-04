import { Link } from "@tanstack/react-router";

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
import { cn } from "@/lib/utils";
import { graphql } from "relay-runtime";
import type { accountsViewFragment$key } from "./__generated__/accountsViewFragment.graphql";
import { useFragment } from "react-relay";
import NetWorthInfo from "./net-worth-info";
import AccountDataTable from "./account-data-table";

type AccountsViewProps = {
  accountsViewFragment: accountsViewFragment$key;
  detail?: string;
};

const AccountsViewFragment = graphql`
  fragment accountsViewFragment on Query {
    ...netWorthInfoFragment
    # ...accountListViewFragment
    ...accountDataTableFragment
  }
`;

export function AccountsView({ accountsViewFragment }: AccountsViewProps) {
  const data = useFragment(AccountsViewFragment, accountsViewFragment);

  return (
    <div className={cn("min-h-full w-full")}>
      <NetWorthInfo netWorthInfoFragment={data} />

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

      {/* <AccountListView accountListViewFragment={data} /> */}
      <AccountDataTable accountDataTableFragment={data} />
    </div>
  );
}
