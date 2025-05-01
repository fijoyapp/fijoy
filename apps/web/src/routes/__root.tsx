import { AuthContext } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { Transport } from "@connectrpc/connect";
import { ProfileContext } from "@/profile";

interface RouterContext {
  auth: AuthContext;
  profile: ProfileContext;
  queryClient: QueryClient;
  transport: Transport;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      {!import.meta.env.PROD && (
        <>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools />
        </>
      )}
    </>
  ),
});
