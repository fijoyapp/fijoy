import { createFileRoute } from "@tanstack/react-router";

import { NewAccountStep } from "@/types/accounts";
import { z } from "zod";
import AddAccount from "@/components/accounts/add-account";
import { AccountTable } from "@/components/accounts/account-table";
import { columns } from "@/components/accounts/columns";
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

const setupNewAccountSchema = z.object({
  step: NewAccountStep.default("name").optional(),
});

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/accounts/",
)({
  // loaderDeps: ({ search}) => ({ search }),
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
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const context = Route.useRouteContext();
  const accountsQuery = useSuspenseQuery(getAccountsQueryOptions({ context }));
  const accounts = accountsQuery.data.accounts;
  const { step } = Route.useSearch();

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Accounts</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage your accounts
        </PageHeaderDescription>
      </PageHeader>

      <AddAccount workspace={context.workspace} step={step ?? "name"} />

      <AccountTable columns={columns} data={accounts} />
    </>
  );
}
