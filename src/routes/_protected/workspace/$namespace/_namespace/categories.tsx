import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/categories",
)({
  component: Page,
});

function Page() {}
