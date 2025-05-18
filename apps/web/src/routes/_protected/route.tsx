import {
  Navigate,
  Outlet,
  createFileRoute,
  redirect,
  useMatchRoute,
} from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { queryClient } from "@/lib/query";
import { userQueryOptions } from "@/lib/queries/user";
import { graphql } from "relay-runtime";
import { loadQuery, useFragment, useLazyLoadQuery } from "react-relay";
import { routeProtectedQuery } from "./__generated__/routeProtectedQuery.graphql";
import { profileFragment$key } from "@/lib/queries/__generated__/profileFragment.graphql";
import { ProfileFragment } from "@/lib/queries/profile";

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
    const user = await queryClient.ensureQueryData(userQueryOptions());
    if (!user) {
      throw redirect({ to: "/login" });
    }
    return { user, protectedQueryRef };
  },
});

export const RouteProtectedQuery = graphql`
  query routeProtectedQuery {
    profile {
      ...profileFragment
    }
    user {
      ...userFragment
    }
    accounts {
      ...accountsFragment
    }
  }
`;

function Protected() {
  const matchRoute = useMatchRoute();

  const data = useLazyLoadQuery<routeProtectedQuery>(RouteProtectedQuery, {});

  // const user = useFragment<userFragment$key>(UserFragment, data.user);
  const profile = useFragment<profileFragment$key>(
    ProfileFragment,
    data.profile,
  );

  if (!profile && !matchRoute({ to: "/setup" })) {
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  if (profile && matchRoute({ to: "/setup" })) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
