import { useAuth } from "@/hooks/use-auth";
import {
  Navigate,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { routeQuery } from "./__generated__/routeQuery.graphql";

export const Route = createFileRoute("/_protected")({
  component: Protected,
});

const RouteQuery = graphql`
  query routeQuery {
    profile {
      ...routeFragment
    }
  }
`;

function Protected() {
  const auth = useAuth();
  const data = useLazyLoadQuery<routeQuery>(RouteQuery, {});
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
