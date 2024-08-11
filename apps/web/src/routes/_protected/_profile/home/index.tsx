import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_profile/home/")({
  component: () => <div>Hello /_protected/_profile/home/!</div>,
});

