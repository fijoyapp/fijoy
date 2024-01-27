import { AuthContext } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterContext {
  auth: AuthContext;
}

export const Route = rootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <SiteHeader />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
});
