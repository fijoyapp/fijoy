import { useUser } from "@/auth";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: Public,
});

function Public() {
  const auth = useUser();

  if (auth.user) {
    return <Navigate to="/workspace" />;
  }

  return <Outlet />;
}
