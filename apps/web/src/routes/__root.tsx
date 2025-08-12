import { QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { graphql, type IEnvironment } from "relay-runtime";
import type { RootQuery } from "./__generated__/RootQuery.graphql";
import { DataProvider } from "@/data";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
// import { loadQuery } from "react-relay";
// import { type RootQuery } from "./__generated__/RootQuery.graphql";

interface RouterContext {
  queryClient: QueryClient;
  environment: IEnvironment;
}

// eslint-disable-next-line react-refresh/only-export-components
export const rootQuery = graphql`
  query RootQuery($hasUser: Boolean!, $hasProfile: Boolean!) {
    user @include(if: $hasUser) {
      # eslint-disable-next-line relay/must-colocate-fragment-spreads
      ...userFragment
    }
    profiles @include(if: $hasUser) {
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

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  wrapInSuspense: true,
  beforeLoad: async ({ context, matches }) => {
    const currentRouteId = matches[matches.length - 1].id;

    const hasProfile = currentRouteId.startsWith("/_protected/_profile");
    const hasUser = currentRouteId.startsWith("/_protected");
    return {
      loadRootQuery: async () => {
        const rootQueryRef = loadQuery<RootQuery>(
          context.environment,
          rootQuery,
          { hasProfile, hasUser },
          { fetchPolicy: "store-or-network" },
        );
        return { rootQueryRef };
      },
    };
  },
  loader: ({ context: { loadRootQuery } }) => {
    return loadRootQuery();
  },
  pendingComponent: CenterLoadingSpinner,
});

function RootLayout() {
  const { rootQueryRef } = Route.useLoaderData();

  const data = usePreloadedQuery(rootQuery, rootQueryRef);

  return (
    <>
      <DataProvider data={data}>
        <Outlet />
        {!import.meta.env.PROD && (
          <>
            <TanStackRouterDevtools position="bottom-right" />
            {/* <ReactQueryDevtools /> */}
          </>
        )}
      </DataProvider>
    </>
  );
}
