import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_public/stack")({
  component: () => <div>Hello /_public/stack!</div>,
});
