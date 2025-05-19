import {
  Navigate,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { graphql } from "relay-runtime";
import { loadQuery, useLazyLoadQuery } from "react-relay";
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
    profiles {
      id
      currencies
      locale
    }
    currencies {
      ...currencyFragment
    }
  }
`;

function Protected() {
  const matchRoute = useMatchRoute();
  const data = useLazyLoadQuery<routeProtectedQuery>(RouteProtectedQuery, {});

  if (data.profiles.length === 0 && !matchRoute({ to: "/setup" })) {
    debugger;
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  return <Outlet />;
}
