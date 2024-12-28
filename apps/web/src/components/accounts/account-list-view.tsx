import { Account } from "@/gen/proto/fijoy/v1/account_pb";
import { LiquidityCard } from "./liquidity/card";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Fragment, useMemo } from "react";
import { accountsGroupBy } from "@/lib/account";
import { LiabilityCard } from "./liability/card";
import { PropertyCard } from "./property/card";
import { ReceivableCard } from "./receivable/card";
import { InvestmentCard } from "./investment/card";

type AccountListProps = {
  accounts: Account[];
};

type Section = {
  name: string;
  accounts: Account[];
  card: React.FC<{ account: Account }>;
};

export default function AccountListView({ accounts }: AccountListProps) {
  const { liabilities, liquidities, investments, properties, receivables } =
    useMemo(() => accountsGroupBy(accounts), [accounts]);

  const sections: Section[] = [
    {
      name: "Liquidity",
      accounts: liquidities,
      card: LiquidityCard,
    },
    {
      name: "Investment",
      accounts: investments,
      card: InvestmentCard,
    },
    {
      name: "Property",
      accounts: properties,
      card: PropertyCard,
    },
    {
      name: "Receivable",
      accounts: receivables,
      card: ReceivableCard,
    },
    {
      name: "Liability",
      accounts: liabilities,
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
