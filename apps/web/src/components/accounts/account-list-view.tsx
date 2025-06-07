import { LiquidityCard } from "./liquidity/card";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Fragment, useMemo } from "react";
import { accountsGroupBy } from "@/lib/account";
import { LiabilityCard } from "./liability/card";
import { PropertyCard } from "./property/card";
import { ReceivableCard } from "./receivable/card";
import { InvestmentCard } from "./investment/card";
import type { cardFragment$key } from "./__generated__/cardFragment.graphql";
import type { accountsPageFragment$data } from "@/routes/_protected/_profile/__generated__/accountsPageFragment.graphql";

type AccountListProps = {
  accounts: accountsPageFragment$data["accounts"];
};

type Section = {
  name: string;
  accounts: accountsPageFragment$data["accounts"];
  card: React.FC<{ account: cardFragment$key }>;
};

export default function AccountListView({ accounts }: AccountListProps) {
  const { liability, liquidity, investment, property, receivable } = useMemo(
    () => accountsGroupBy(accounts),
    [accounts],
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
                  if (idx === 0) {
                    return <section.card key={account.id} account={account} />;
                  }

                  return (
                    <Fragment key={account.id}>
                      <Separator className="" />
                      <section.card account={account} />
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
