import { env } from "@/env";
import { queryClient } from "@/main";
import { SelectWorkspace } from "@/types/workspace";
import { queryOptions } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/_protected/workspace/$namespace/_namespace")({
  beforeLoad: async ({ params }) => {
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
    await queryClient.ensureQueryData(queryOpts);
    const workspace = queryClient.getQueryData(queryOpts.queryKey);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    return { workspace };
  },
  component: () => <Outlet />,
});

