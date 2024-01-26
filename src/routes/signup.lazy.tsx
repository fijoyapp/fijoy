import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  return (
    <div className="container max-w-screen-2xl">
      <div>Signup</div>
    </div>
  );
}

