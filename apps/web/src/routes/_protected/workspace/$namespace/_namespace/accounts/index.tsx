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

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/accounts/",
)({
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

  return (
    <div className="container max-w-screen-2xl">
      <div className="items-end gap-4 lg:flex">
        <PageHeader>
          <PageHeaderHeading className="">Accounts</PageHeaderHeading>
          <PageHeaderDescription className="">
            View all accounts at a glance.
          </PageHeaderDescription>
        </PageHeader>
        <div className="grow" />
        <div className="hidden items-center justify-center sm:flex">
          <NetWorthCard accounts={accounts} />
          <TotalDebtCard accounts={accounts} />
          <TotalAssetCard accounts={accounts} />
        </div>
      </div>

      <div className="py-2 lg:py-4" />

      <AddAccount workspace={context.workspace} />

      <div className="py-2 lg:py-4" />

      <AccountTable columns={columns} data={accounts} />

      <div className="py-2 lg:py-4" />
    </div>
  );
}

type CardProps = {
  accounts: Account[];
};

const NetWorthCard = ({ accounts }: CardProps) => {
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
            { compact: true },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

const TotalDebtCard = ({ accounts }: CardProps) => {
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
            { compact: true },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

const TotalAssetCard = ({ accounts }: CardProps) => {
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
            { compact: true },
          )}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Page;
