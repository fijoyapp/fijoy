import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

import { graphql } from "relay-runtime";
import { usePreloadedQuery, useRefetchableFragment } from "react-relay";
import { type RootQuery } from "@/routes/__generated__/RootQuery.graphql";
import { rootQuery } from "@/routes/__root";
import { AccountType } from "@/types/account";
import type { accountsPageFragment$key } from "./__generated__/accountsPageFragment.graphql";
import type { AccountsPageRefetch } from "./__generated__/AccountsPageRefetch.graphql";
import { AccountsView } from "./-components/accounts/accounts-view";
import { AddAccount } from "./-components/accounts/add-account";

const accountsRouteSchema = z.object({
  add: AccountType.optional(),
  detail: z.string().startsWith("account_").optional(),
});

const AccountsPageFragment = graphql`
  fragment accountsPageFragment on Query
  @refetchable(queryName: "AccountsPageRefetch") {
    ...accountsViewFragment
  }
`;

export const Route = createFileRoute("/_protected/_profile/accounts")({
  // loaderDeps: ({ search}) => ({ search }),
  validateSearch: (search) => {
    return accountsRouteSchema.parse(search);
  },
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const { add, detail } = Route.useSearch();
  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fragmentData, _] = useRefetchableFragment<
    AccountsPageRefetch,
    accountsPageFragment$key
  >(AccountsPageFragment, data);

  return (
    <>
      {add ? (
        <AddAccount type={add} />
      ) : (
        <AccountsView accountsViewFragment={fragmentData} detail={detail} />
      )}
    </>
  );
}
