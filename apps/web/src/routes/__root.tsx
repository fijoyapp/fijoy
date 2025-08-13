import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type IEnvironment } from "relay-runtime";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

interface RouterContext {
  queryClient: QueryClient;
  environment: IEnvironment;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  wrapInSuspense: true,
  pendingComponent: CenterLoadingSpinner,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      {!import.meta.env.PROD && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  );
}
