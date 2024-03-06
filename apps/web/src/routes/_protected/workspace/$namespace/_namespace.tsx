import PrivateSidebar from "@/components/private-sidebar";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { getWorkspaceByNamespaceQueryOptions } from "@/lib/queries/workspace";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace",
)({
  beforeLoad: async ({ params, context }) => {
    const workspaceQueryOpts = getWorkspaceByNamespaceQueryOptions({
      namespace: params.namespace,
      context,
    });

    await context.queryClient.ensureQueryData(workspaceQueryOpts);

    const workspace = context.queryClient.getQueryData<Workspace>(
      workspaceQueryOpts.queryKey,
    );

    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return { workspace };
  },

  loader: ({ context }) => {
    const accountsQueryOpts = getAccountsQueryOptions({ context });
    return context.queryClient.ensureQueryData(accountsQueryOpts);
  },

  component: () => (
    <div className="flex w-screen">
      <PrivateSidebar className="m-4 w-56 flex-shrink-0 rounded-xl bg-muted" />
      <div className="h-screen min-w-[48rem] grow flex-nowrap overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  ),
});
