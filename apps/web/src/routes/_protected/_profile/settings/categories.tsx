import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_profile/settings/categories",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/_profile/settings/categories"!</div>;
}
