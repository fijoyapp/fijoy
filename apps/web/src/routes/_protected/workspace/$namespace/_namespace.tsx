import PrivateSidebar from "@/components/private-sidebar";
import { Accounts } from "@/gen/proto/fijoy/v1/account_pb";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { categoriesQueryOptions } from "@/lib/queries/category";
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

  loader: async ({ context }) => {
    const accountsQueryOpts = getAccountsQueryOptions({ context });
    await context.queryClient.ensureQueryData(accountsQueryOpts);

    const accounts = context.queryClient.getQueryData<Accounts>(
      accountsQueryOpts.queryKey,
    );

    if (!accounts) {
      throw new Error("Accounts not found");
    }

    await context.queryClient.ensureQueryData(
      categoriesQueryOptions(context.workspace.id),
    );

    return { accounts: accounts.accounts };
  },

  component: () => (
    <div className="flex w-screen">
      <PrivateSidebar className="m-4 w-56 rounded-xl bg-muted" />
      <div className="h-screen grow overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  ),
});
