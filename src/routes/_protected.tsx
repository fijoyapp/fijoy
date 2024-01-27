import { useUser } from "@/auth";
import { Icons } from "@/components/icons";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: Protected,
});

function Protected() {
  const auth = useUser();

  if (auth.isLoading) {
    // TODO: Make this more pretty
    return <Icons.spinner className="animate-spin" />;
  }

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
