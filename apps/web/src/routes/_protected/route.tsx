import { useAuth } from "@/hooks/use-auth";
import {
  Navigate,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import { useProfile } from "@/hooks/use-profile";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { getProfileQueryOptions } from "@/lib/queries/profile";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ context }) => {
    const profileQueryOpts = getProfileQueryOptions({
      context,
    });
    const profile = await context.queryClient.ensureQueryData(profileQueryOpts);
    return { profile: profile };
  },
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
