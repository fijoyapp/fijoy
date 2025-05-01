import { useAuth } from "@/hooks/use-auth";
import {
  Navigate,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { graphql } from "relay-runtime";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { routeQuery } from "./__generated__/routeQuery.graphql";
import { environment } from "@/environment";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const queryReference = loadQuery<routeQuery>(
      environment,
      RouteQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );
    return { queryReference };
  },
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
});

const RouteQuery = graphql`
  query routeQuery {
    profile {
      id
    }
  }
`;

function Protected() {
  const auth = useAuth();
  const { queryReference } = Route.useRouteContext();
  const data = usePreloadedQuery<routeQuery>(RouteQuery, queryReference);
  const matchRoute = useMatchRoute();

  if (auth.isLoading || !data) {
    return <CenterLoadingSpinner />;
  }

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (!data.profile && !matchRoute({ to: "/setup" })) {
    console.log("no profile");
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  if (data.profile && matchRoute({ to: "/setup" })) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
