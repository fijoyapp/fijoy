import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_profile/settings/profiles")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/_profile/settings/profiles"!</div>;
}
