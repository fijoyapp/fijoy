import { Outlet, createFileRoute } from "@tanstack/react-router";
import invariant from "tiny-invariant";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { useFragment } from "react-relay";
import { type userFragment$key } from "@/lib/queries/__generated__/userFragment.graphql";
import { UserFragment } from "@/lib/queries/user";
import { AuthProvider } from "@/auth";
import { useData } from "@/hooks/use-data";

export const Route = createFileRoute("/_protected")({
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
});

function Protected() {
  const { data } = useData();

  const user = useFragment<userFragment$key>(UserFragment, data.user);

  invariant(user, "User data is required for protected routes");

  return (
    <AuthProvider user={user}>
      <Outlet />
    </AuthProvider>
  );
}
