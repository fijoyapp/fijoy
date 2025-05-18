import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { Transport } from "@connectrpc/connect";
import { IEnvironment } from "relay-runtime";

interface RouterContext {
  queryClient: QueryClient;
  transport: Transport;
  environment: IEnvironment;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      {!import.meta.env.PROD && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools />
        </>
      )}
    </>
  );
}
