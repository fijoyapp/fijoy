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
import { environment } from "@/environment";
import { routeProfileQuery } from "./__generated__/routeProfileQuery.graphql";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const profileQueryRef = loadQuery<routeProfileQuery>(
      environment,
      ProfileQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );
    return { profileQueryRef };
  },
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
});

const ProfileQuery = graphql`
  query routeProfileQuery {
    profile {
      id
    }
  }
`;

function Protected() {
  const auth = useAuth();
  const { profileQueryRef } = Route.useRouteContext();
  const data = usePreloadedQuery<routeProfileQuery>(
    ProfileQuery,
    profileQueryRef,
  );
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
