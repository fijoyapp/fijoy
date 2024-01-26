import { useUser } from "@/hooks/use-user";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const user = useUser();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <a href="http://localhost:3000/auth/google/login">Google Login</a>
      <div>{JSON.stringify(user.data)}</div>
      <a href="http://localhost:3000/auth/google/logout">Google Logout</a>
    </div>
  );
}
