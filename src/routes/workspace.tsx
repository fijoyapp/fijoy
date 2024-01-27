import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace")({
  beforeLoad: ({ context, location }) => {
    console.log("context", context);
    if (!context.auth.user) {
      throw redirect({
        to: "/",
        search: {
          redirect: location,
        },
      });
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return <Outlet />;
}
