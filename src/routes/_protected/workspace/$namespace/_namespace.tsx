import { api } from "@/lib/ky";
import { accountsQueryOptions } from "@/lib/queries/account";
import { categoriesQueryOptions } from "@/lib/queries/category";
import { SelectWorkspace } from "@/types/workspace";
import { queryOptions } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace",
)({
  beforeLoad: async ({ params, context }) => {
    const queryOpts = queryOptions({
      queryKey: ["workspaces", params.namespace],
      queryFn: async () => {
        const res = await api
          .get(`workspaces/${params.namespace}?namespace=true`)
          .json();
        return SelectWorkspace.parse(res);
      },
    });
    await context.queryClient.ensureQueryData(queryOpts);
    const workspace = context.queryClient.getQueryData(queryOpts.queryKey);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    return { workspace };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      categoriesQueryOptions(context.workspace.ID),
    );

    await context.queryClient.ensureQueryData(
      accountsQueryOptions(context.workspace.ID),
    );
  },
  component: () => <Outlet />,
});
