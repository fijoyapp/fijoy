import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { Transport } from "@connectrpc/connect";
import { graphql, IEnvironment } from "relay-runtime";
import { loadQuery } from "react-relay";
import { RootQuery } from "./__generated__/RootQuery.graphql";

interface RouterContext {
  queryClient: QueryClient;
  transport: Transport;
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
    transactions @include(if: $hasProfile) {
      id
      ...transactionCardFragment
    }
    currencies {
      ...currencyFragment
    }
    ...accountsPageFragment @include(if: $hasProfile)
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
      { fetchPolicy: "store-or-network" },
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
