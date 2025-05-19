import { Outlet, createFileRoute } from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { graphql } from "relay-runtime";
import { loadQuery } from "react-relay";
import { routeProtectedQuery } from "./__generated__/routeProtectedQuery.graphql";

export const Route = createFileRoute("/_protected")({
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
  beforeLoad: async ({ context }) => {
    const protectedQueryRef = loadQuery<routeProtectedQuery>(
      context.environment,
      RouteProtectedQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );
    return { protectedQueryRef };
  },
});

export const RouteProtectedQuery = graphql`
  query routeProtectedQuery {
    user {
      ...userFragment
    }
    currencies {
      ...currencyFragment
    }
  }
`;

function Protected() {
  return <Outlet />;
}
