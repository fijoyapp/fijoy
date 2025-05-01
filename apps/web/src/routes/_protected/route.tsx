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
import { routeUserQuery } from "./__generated__/routeUserQuery.graphql";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const profileQueryRef = loadQuery<routeProfileQuery>(
      environment,
      ProfileQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );
    const userQueryRef = loadQuery<routeUserQuery>(
      environment,
      UserQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );
    return { profileQueryRef, userQueryRef };
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

const UserQuery = graphql`
  query routeUserQuery {
    profile {
      id
    }
  }
`;

function Protected() {
  // const auth = useAuth();
  const { profileQueryRef, userQueryRef } = Route.useRouteContext();
  const profile = usePreloadedQuery<routeProfileQuery>(
    ProfileQuery,
    profileQueryRef,
  );
  const user = usePreloadedQuery<routeUserQuery>(UserQuery, userQueryRef);

  const matchRoute = useMatchRoute();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!profile.profile && !matchRoute({ to: "/setup" })) {
    console.log("no profile");
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  if (profile.profile && matchRoute({ to: "/setup" })) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
