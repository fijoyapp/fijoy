import { useAuth } from "@/auth";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: Public,
});

function Public() {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/workspace" />;
  }

  return <Outlet />;
}
