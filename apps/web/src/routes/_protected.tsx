import { useAuth } from "@/hooks/use-auth";
import { Icons } from "@/components/icons";
import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: Protected,
});

function Protected() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Icons.spinner className="animate-spin" />
      </div>
    );
  }

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
