import {
  Navigate,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";

export const Route = createFileRoute("/_protected")({
  pendingComponent: CenterLoadingSpinner,
  component: Protected,
});

function Protected() {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { profile, isLoading: isLoadingProfile } = useProfile();

  const matchRoute = useMatchRoute();

  if (isLoadingUser || isLoadingProfile) {
    return <CenterLoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!profile && !matchRoute({ to: "/setup" })) {
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  if (profile && matchRoute({ to: "/setup" })) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
