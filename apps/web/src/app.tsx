import { useTransport } from "@connectrpc/connect-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./lib/query";
import { useAuth } from "./hooks/use-auth";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // will be set after we wrap the app in AuthProvider
    transport: undefined!,
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth();

  const transport = useTransport();

  return <RouterProvider router={router} context={{ auth, transport }} />;
}
