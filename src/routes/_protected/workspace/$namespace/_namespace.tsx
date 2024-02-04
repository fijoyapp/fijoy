import { env } from "@/env";
import { accountsQueryOptions } from "@/lib/queries/account";
import { categoriesQueryOptions } from "@/lib/queries/category";
import { SelectWorkspace } from "@/types/workspace";
import { queryOptions } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace",
)({
  beforeLoad: async ({ params, context }) => {
    const queryOpts = queryOptions({
      queryKey: ["workspace", params.namespace],
      queryFn: async () => {
        const res = await axios.get(
          env.VITE_BACKEND_URL +
            `/workspace/${params.namespace}?namespace=true`,
          { withCredentials: true },
        );
        return SelectWorkspace.parse(res.data);
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
