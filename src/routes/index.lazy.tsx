import { env } from "@/env";
import { useUser } from "@/hooks/use-user";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const user = useUser();
  return (
    <div className="container max-w-screen-2xl">
      <h3>Welcome Home!</h3>
      <a href={env.VITE_BACKEND_URL + "/auth/google/login"}>Google Login</a>
      <div>{JSON.stringify(user.data)}</div>
      <a href={env.VITE_BACKEND_URL + "/auth/google/logout"}>Google Logout</a>
    </div>
  );
}
