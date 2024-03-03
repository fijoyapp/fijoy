import { getWorkspaceByNamespace } from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { accountsQueryOptions } from "@/lib/queries/account";
import { categoriesQueryOptions } from "@/lib/queries/category";
import { createQueryOptions } from "@connectrpc/connect-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace",
)({
  beforeLoad: async ({ params, context }) => {
    const queryOpts = createQueryOptions(
      getWorkspaceByNamespace,
      { namespace: params.namespace },
      { transport: context.transport },
    );

    await context.queryClient.ensureQueryData(queryOpts);
    const workspace = context.queryClient.getQueryData<Workspace>(
      queryOpts.queryKey,
    );
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    return { workspace };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      categoriesQueryOptions(context.workspace.id),
    );

    await context.queryClient.ensureQueryData(
      accountsQueryOptions(context.workspace.id),
    );
  },
  component: () => <Outlet />,
});
