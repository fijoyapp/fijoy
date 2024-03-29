import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/settings/currency/",
)({
  component: () => (
    <div>Hello /_protected/workspace/$namespace/settings/currency/!</div>
  ),
});
