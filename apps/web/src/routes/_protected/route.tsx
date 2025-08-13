import { Outlet, createFileRoute, useMatches } from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import { type userFragment$key } from "@/lib/queries/__generated__/userFragment.graphql";
import { UserFragment } from "@/lib/queries/user";
import { AuthProvider } from "@/auth";
import { DataProvider } from "@/data";
import type { routeProtectedQuery } from "./__generated__/routeProtectedQuery.graphql";

const RouteProtectedQuery = graphql`
  query routeProtectedQuery($hasProfile: Boolean!) {
    user @required(action: THROW) {
      # eslint-disable-next-line relay/must-colocate-fragment-spreads
      ...userFragment
    }
    profiles {
      # eslint-disable-next-line relay/must-colocate-fragment-spreads
      ...profilesFragment
    }
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...profileFragment @include(if: $hasProfile)
    currencies {
      # eslint-disable-next-line relay/must-colocate-fragment-spreads
      ...currencyFragment
    }
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...accountsPageFragment @include(if: $hasProfile)
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...transactionsPageFragment @include(if: $hasProfile)
  }
`;

export const Route = createFileRoute("/_protected")({
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
});

function Protected() {
  const matches = useMatches();
  const currentRouteId = matches[matches.length - 1].id;

  const hasProfile = currentRouteId.startsWith("/_protected/_profile");

  const data = useLazyLoadQuery<routeProtectedQuery>(RouteProtectedQuery, {
    hasProfile,
  });

  const user = useFragment<userFragment$key>(UserFragment, data.user);

  return (
    <DataProvider data={data}>
      <div className="h-screen">
        <AuthProvider user={user}>
          <Outlet />
        </AuthProvider>
      </div>
    </DataProvider>
  );
}
