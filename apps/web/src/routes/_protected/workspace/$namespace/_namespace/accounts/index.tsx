import { AccountTable } from "@/components/accounts/account-table";
import AddAccount from "@/components/accounts/add-account";
import { columns } from "@/components/accounts/columns";

import currency from "currency.js";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
import { accountTypeConfigMap } from "@/config/account";
import { useWorkspace } from "@/workspace";
import { NewAccountStep } from "@/types/accounts";
import { z } from "zod";

const setupNewAccountSchema = z.object({
  step: NewAccountStep.default("name").optional(),
});

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/accounts/",
)({
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
  component: Page,
});

function Page() {
  const context = Route.useRouteContext();
  const accountsQuery = useSuspenseQuery(getAccountsQueryOptions({ context }));
  const accounts = accountsQuery.data.accounts;
  const { step } = Route.useSearch();

  return (
    <div className="container max-w-screen-2xl">
      <div className="flex items-end gap-4">
        <PageHeader>
          <PageHeaderHeading className="">Accounts</PageHeaderHeading>
          <PageHeaderDescription className="">
            View all accounts at a glance.
          </PageHeaderDescription>
        </PageHeader>
        <div className="grow" />
        <div className="flex items-center justify-center">
          <NetWorthCard accounts={accounts} />
          <TotalDebtCard accounts={accounts} />
          <TotalAssetCard accounts={accounts} />
        </div>
      </div>

      <div className="py-4" />

      <AddAccount workspace={context.workspace} step={step ?? "name"} />

      <div className="py-4" />

      <AccountTable columns={columns} data={accounts} />

      <div className="py-4" />
    </div>
  );
}

type CardProps = {
  accounts: Account[];
};

const NetWorthCard = ({ accounts }: CardProps) => {
  const { workspace } = useWorkspace();
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardDescription>Net Worth</CardDescription>
        <CardTitle className="">
          {currencyToDisplay(
            accounts.reduce((acc, cur) => {
              if (!cur.balance) return acc;
              return acc.add(moneyToCurrency(cur.balance, { reverse: false }));
            }, currency(0)),
            "CAD", // TODO: Use user's currency
            { compact: true, locale: workspace.locale },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

const TotalDebtCard = ({ accounts }: CardProps) => {
  const { workspace } = useWorkspace();
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardDescription>Total Debt</CardDescription>
        <CardTitle className="font-roboto-mono">
          {currencyToDisplay(
            accounts
              .filter(
                (a) =>
                  a.accountType !== AccountType.UNSPECIFIED &&
                  accountTypeConfigMap[a.accountType].isDebt,
              )
              .reduce((acc, cur) => {
                if (!cur.balance) return acc;
                return acc.add(moneyToCurrency(cur.balance, { reverse: true }));
              }, currency(0)),
            "CAD", // TODO: Use user's currency
            { compact: true, locale: workspace.locale },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

const TotalAssetCard = ({ accounts }: CardProps) => {
  const { workspace } = useWorkspace();
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardDescription>Total Asset</CardDescription>
        <CardTitle className="font-roboto-mono">
          {currencyToDisplay(
            accounts
              .filter(
                (a) =>
                  a.accountType !== AccountType.UNSPECIFIED &&
                  !accountTypeConfigMap[a.accountType].isDebt,
              )
              .reduce((acc, cur) => {
                if (!cur.balance) return acc;
                return acc.add(
                  moneyToCurrency(cur.balance, { reverse: false }),
                );
              }, currency(0)),
            "CAD", // TODO: Use user's currency
            { compact: true, locale: workspace.locale },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Page;
