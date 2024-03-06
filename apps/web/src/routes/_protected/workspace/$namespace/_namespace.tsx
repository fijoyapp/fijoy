import PrivateSidebar from "@/components/private-sidebar";
import { siteConfig } from "@/config/site";
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
        <div className="my-4 mr-4 overflow-hidden overflow-ellipsis whitespace-nowrap rounded-xl bg-muted p-4 text-center">
          Fijoy is currently in development :) Join our{" "}
          <a
            href={siteConfig.links.discord}
            target="_blank"
            className="text-primary"
          >
            Discord
          </a>{" "}
          to follow along, and checkout our{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            className="text-primary"
          >
            GitHub ⭐
          </a>
        </div>
        <Outlet />
      </div>
    </div>
  ),
});
