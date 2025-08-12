import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

import { graphql } from "relay-runtime";
import { useRefetchableFragment } from "react-relay";
import { AccountType } from "@/types/account";
import type { accountsPageFragment$key } from "./__generated__/accountsPageFragment.graphql";
import type { AccountsPageRefetch } from "./__generated__/AccountsPageRefetch.graphql";
import { AccountsView } from "./-components/accounts/accounts-view";
import { AddAccount } from "./-components/accounts/add-account";
import { useData } from "@/hooks/use-data";

const accountsRouteSchema = z.object({
  add: AccountType.optional(),
  groupby: z.enum(["accountType", "institution"]).optional(),
});

const AccountsPageFragment = graphql`
  fragment accountsPageFragment on Query
  @refetchable(queryName: "AccountsPageRefetch") {
    ...accountsViewFragment
    ...addAccountFragment
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
  const { add } = Route.useSearch();
  const { data } = useData();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fragmentData, _] = useRefetchableFragment<
    AccountsPageRefetch,
    accountsPageFragment$key
  >(AccountsPageFragment, data);

  return (
    <>
      {add ? (
        <AddAccount type={add} fragmentRef={fragmentData} />
      ) : (
        <AccountsView accountsViewFragment={fragmentData} />
      )}
    </>
  );
}
