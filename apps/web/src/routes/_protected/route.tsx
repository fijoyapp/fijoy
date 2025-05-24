import { Outlet, createFileRoute } from "@tanstack/react-router";
import invariant from "tiny-invariant";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { useFragment, usePreloadedQuery } from "react-relay";
import { RootQuery } from "../__generated__/RootQuery.graphql";
import { rootQuery } from "../__root";
import { userFragment$key } from "@/lib/queries/__generated__/userFragment.graphql";
import { UserFragment } from "@/lib/queries/user";
import { AuthProvider } from "@/auth";

export const Route = createFileRoute("/_protected")({
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
});

function Protected() {
  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);
  const user = useFragment<userFragment$key>(UserFragment, data.user);

  invariant(user, "User data is required for protected routes");

  return (
    <AuthProvider user={user}>
      <Outlet />
    </AuthProvider>
  );
}
