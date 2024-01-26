import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <div className="container max-w-screen-2xl">
      <div>Login</div>
    </div>
  );
}
