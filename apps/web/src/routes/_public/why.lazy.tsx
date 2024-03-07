import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_public/why")({
  component: () => <div>Hello /_public/why!</div>,
});
