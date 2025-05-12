import {
  Navigate,
  Outlet,
  createFileRoute,
  redirect,
  useMatchRoute,
} from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { useProfile } from "@/hooks/use-profile";
import { queryClient } from "@/lib/query";
import { userQueryOptions } from "@/lib/queries/user";

export const Route = createFileRoute("/_protected")({
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
  beforeLoad: async () => {
    const user = await queryClient.ensureQueryData(userQueryOptions());
    if (!user) {
      throw redirect({ to: "/login" });
    }
    return { user };
  },
});

function Protected() {
  const { profile, isLoading } = useProfile();

  const matchRoute = useMatchRoute();

  if (isLoading) {
    return <CenterLoadingSpinner />;
  }

  if (!profile && !matchRoute({ to: "/setup" })) {
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  if (profile && matchRoute({ to: "/setup" })) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
