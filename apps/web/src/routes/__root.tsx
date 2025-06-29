import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { graphql, type IEnvironment } from "relay-runtime";
import { loadQuery } from "react-relay";
import { type RootQuery } from "./__generated__/RootQuery.graphql";

interface RouterContext {
  queryClient: QueryClient;
  environment: IEnvironment;
}

export const rootQuery = graphql`
  query RootQuery($hasUser: Boolean!, $hasProfile: Boolean!) {
    user @include(if: $hasUser) {
      ...userFragment
    }
    profiles @include(if: $hasUser) {
      ...profileFragment
    }
    currencies {
      ...currencyFragment
    }
    ...accountsPageFragment @include(if: $hasProfile)
    ...transactionsPageFragment @include(if: $hasProfile)
  }
`;

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  beforeLoad: (ctx) => {
    const currentRouteId: string = ctx.matches[ctx.matches.length - 1].id;

    const hasProfile = currentRouteId.startsWith("/_protected/_profile");
    const hasUser = currentRouteId.startsWith("/_protected");

    const rootQueryRef = loadQuery<RootQuery>(
      ctx.context.environment,
      rootQuery,
      { hasProfile, hasUser },
      // FIXME: use "store-or-network"
      { fetchPolicy: "store-and-network" },
    );
    return { rootQueryRef };
  },
});

function RootLayout() {
  return (
    <>
      <Outlet />
      {!import.meta.env.PROD && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools />
        </>
      )}
    </>
  );
}
