import { Outlet, createFileRoute } from "@tanstack/react-router";
import { PublicHeader } from "@/components/public-header";

export const Route = createFileRoute("/_public")({
  component: Public,
});

function Public() {
  return (
    <div className="h-screen">
      <PublicHeader />
      <Outlet />
    </div>
  );
}
