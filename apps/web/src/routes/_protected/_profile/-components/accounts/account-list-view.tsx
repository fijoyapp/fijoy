import { LiquidityCard } from "./liquidity/card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Fragment, useMemo } from "react";
import { accountsGroupBy, type GroupedAccounts } from "@/lib/account";
import { LiabilityCard } from "./liability/card";
import { PropertyCard } from "./property/card";
import { ReceivableCard } from "./receivable/card";
import { InvestmentCard } from "./investment/card";
import type { cardFragment$key } from "./__generated__/cardFragment.graphql";
import { graphql } from "relay-runtime";
import type { accountListViewFragment$key } from "./__generated__/accountListViewFragment.graphql";
import { useFragment } from "react-relay";
import invariant from "tiny-invariant";

type AccountListProps = {
  accountListViewFragment: accountListViewFragment$key;
};

type Section = {
  name: string;
  accounts: GroupedAccounts;
  card: React.FC<{ account: cardFragment$key }>;
};

const AccountListViewFragment = graphql`
  fragment accountListViewFragment on Query {
    accounts(first: 5) {
      edges {
        node {
          id
          accountType
          balance
          ...cardFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export default function AccountListView({
  accountListViewFragment,
}: AccountListProps) {
  const data = useFragment(AccountListViewFragment, accountListViewFragment);
  const accountEdges = data.accounts.edges;
  invariant(accountEdges, "Account edges should not be null or undefined");

  const { liability, liquidity, investment, property, receivable } = useMemo(
    () => accountsGroupBy(accountEdges),
    [accountEdges],
  );

  const sections: Section[] = [
    {
      name: "Liquidity",
      accounts: liquidity,
      card: LiquidityCard,
    },
    {
      name: "Investment",
      accounts: investment,
      card: InvestmentCard,
    },
    {
      name: "Property",
      accounts: property,
      card: PropertyCard,
    },
    {
      name: "Receivable",
      accounts: receivable,
      card: ReceivableCard,
    },
    {
      name: "Liability",
      accounts: liability,
      card: LiabilityCard,
    },
  ];

  return (
    <div className="flex-col space-y-4">
      {sections
        .filter((section) => section.accounts.length > 0)
        .map((section) => {
          return (
            <div key={section.name}>
              <div className="font-semibold">{section.name}</div>
              <div className="py-1"></div>

              <Card className="">
                {section.accounts.map((account, idx) => {
                  invariant(account && account.node);

                  if (idx === 0) {
                    return (
                      <section.card
                        key={account.node.id}
                        account={account.node}
                      />
                    );
                  }

                  return (
                    <Fragment key={account.node.id}>
                      <Separator className="" />
                      <section.card account={account.node} />
                    </Fragment>
                  );
                })}
              </Card>
            </div>
          );
        })}
    </div>
  );
}
