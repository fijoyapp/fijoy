import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/settings/categories/",
)({
  component: () => (
    <div>Hello /_protected/workspace/$namespace/settings/categories/!</div>
  ),
});
