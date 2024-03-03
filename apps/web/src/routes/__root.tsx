import { AuthContext } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { Transport } from "@connectrpc/connect";

interface RouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
  transport: Transport;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <SiteHeader />
      <Outlet />
      {!import.meta.env.PROD && (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </>
      )}
    </>
  ),
});
