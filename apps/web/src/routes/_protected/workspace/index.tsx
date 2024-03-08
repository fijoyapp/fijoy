import { Icons } from "@/components/icons";
import { getWorkspaces } from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { getWorkspacesQueryOptions } from "@/lib/queries/workspace";
import { useSuspenseQuery } from "@connectrpc/connect-query";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/_protected/workspace/")({
  component: Page,
  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      getWorkspacesQueryOptions({ context: opts.context }),
    );
  },
  pendingComponent: () => (
    <div>
      <Icons.spinner className="animate-spin" />,
    </div>
  ),
});

function Page() {
  const workspacesQuery = useSuspenseQuery(getWorkspaces);

  const { workspaces } = workspacesQuery.data;

  if (workspaces.length === 0) {
    return <Navigate to="/setup" search={{ step: "general" }} />;
  }

  const workspace = workspaces.find(
    (w) => w.namespace === Cookies.get("namespace"),
  );

  if (workspace) {
    return (
      <Navigate
        to="/workspace/$namespace"
        params={{ namespace: workspace.namespace }}
      />
    );
  }

  Cookies.set("namespace", workspaces[0].namespace);
  return (
    <Navigate
      to="/workspace/$namespace"
      params={{ namespace: workspaces[0].namespace }}
    />
  );
}

export default Page;
