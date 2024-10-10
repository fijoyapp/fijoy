import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_profile/home/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="p-4 lg:p-6">
      <div>Welcome to Fijoy! </div>
    </div>
  );
}
