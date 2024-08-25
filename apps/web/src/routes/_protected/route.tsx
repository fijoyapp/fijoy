import { useAuth } from "@/hooks/use-auth";
import {
  Navigate,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import { useProfile } from "@/hooks/use-profile";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

export const Route = createFileRoute("/_protected")({
  component: Protected,
});

function Protected() {
  const auth = useAuth();
  const profile = useProfile();
  const matchRoute = useMatchRoute();

  if (auth.isLoading || profile.isLoading) {
    return <CenterLoadingSpinner />;
  }

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (!profile.profile && !matchRoute({ to: "/setup" })) {
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  if (profile.profile && matchRoute({ to: "/setup" })) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
