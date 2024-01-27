import { Icons } from "@/components/icons";
import { workspacesQueryOptions } from "@/lib/queries/workspace";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/_protected/workspace/")({
  component: Page,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(workspacesQueryOptions()),
  pendingComponent: () => <Icons.spinner className="animate-spin" />,
});

function Page() {
  const workspacesQuery = useSuspenseQuery(workspacesQueryOptions());

  const workspaces = workspacesQuery.data;

  if (workspaces.length === 0) {
    return <Navigate to="/setup" />;
  }

  const workspace = workspaces.find(
    (w) => w.Namespace === Cookies.get("namespace"),
  );

  if (workspace) {
    return (
      <Navigate
        to="/workspace/$namespace"
        params={{ namespace: workspace.Namespace }}
      />
    );
  }

  Cookies.set("namespace", workspaces[0].Namespace);
  return (
    <Navigate
      to="/workspace/$namespace"
      params={{ namespace: workspaces[0].Namespace }}
    />
  );
}

export default Page;
