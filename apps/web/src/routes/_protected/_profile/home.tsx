import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_profile/home")({
  component: HomePage,
  pendingComponent: CenterLoadingSpinner,
});

function HomePage() {
  return (
    <div className="p-4 lg:p-6">
      <div>Welcome to Fijoy! </div>
    </div>
  );
}
