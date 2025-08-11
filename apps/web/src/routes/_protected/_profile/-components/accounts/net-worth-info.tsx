import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, CreditCard, PiggyBank, Wallet } from "lucide-react";
import { getOverallStats } from "@/lib/account";
import { useProfile } from "@/hooks/use-profile";
import { useMemo } from "react";
import currency from "currency.js";
import { graphql } from "relay-runtime";
import type { netWorthInfoFragment$key } from "./__generated__/netWorthInfoFragment.graphql";
import invariant from "tiny-invariant";
import { useFragment } from "react-relay";
import { useFormat } from "@/hooks/use-format";

type Props = {
  netWorthInfoFragment: netWorthInfoFragment$key;
};

const NetWorthInfoFragment = graphql`
  fragment netWorthInfoFragment on Query {
    accounts(first: 1000) {
      edges {
        # eslint-disable-next-line relay/unused-fields
        node {
          id
          accountType
          balance
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

const NetWorthInfo = ({ netWorthInfoFragment }: Props) => {
  const data = useFragment(NetWorthInfoFragment, netWorthInfoFragment);
  const accountEdges = data.accounts.edges;
  invariant(accountEdges, "Account edges should not be null or undefined");

  const { asset, netWorth, liability } = useMemo(
    () => getOverallStats(accountEdges),
    [accountEdges],
  );
  const { getCurrencyDisplay } = useFormat();

  const { defaultCurrency, profile } = useProfile();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>
            {getCurrencyDisplay(asset.toString(), defaultCurrency)}
          </CardTitle>
          <CardDescription>Asset</CardDescription>
        </CardHeader>
        <div className="grow"></div>
        <Wallet />
        <div className="px-4"></div>
      </Card>
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>
            {getCurrencyDisplay(liability.toString(), defaultCurrency)}
          </CardTitle>
          <CardDescription>Liability</CardDescription>
        </CardHeader>

        <div className="grow"></div>
        <CreditCard />
        <div className="px-4"></div>
      </Card>
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>
            {getCurrencyDisplay(netWorth.toString(), defaultCurrency)}
          </CardTitle>
          <CardDescription>Net Worth</CardDescription>
        </CardHeader>

        <div className="grow"></div>
        <Coins />
        <div className="px-4"></div>
      </Card>
      <Card className="flex items-center">
        <CardHeader>
          <CardTitle>
            {netWorth
              .multiply(100)
              .divide(currency(profile.netWorthGoal))
              .toString()}
            %
          </CardTitle>
          <CardDescription>
            {getCurrencyDisplay(
              profile.netWorthGoal.toString(),
              defaultCurrency,
            )}{" "}
            Goal
          </CardDescription>
        </CardHeader>

        <div className="grow"></div>
        <PiggyBank />
        <div className="px-4"></div>
      </Card>
    </div>
  );
};

export default NetWorthInfo;
