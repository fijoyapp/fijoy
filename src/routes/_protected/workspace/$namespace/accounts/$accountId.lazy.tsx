import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/_protected/workspace/$namespace/accounts/$accountId",
)({
  component: () => (
    <div>Hello /_protected/workspace/$namespace/accounts/$accountId!</div>
  ),
});

