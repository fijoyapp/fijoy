import { env } from "@/env";
import { SelectAccount } from "@/types/account";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const accountsQueryOptions = (workspaceID: string) => {
  return queryOptions({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await axios.get(env.VITE_BACKEND_URL + "/account", {
        withCredentials: true,
        params: {
          workspace_id: workspaceID,
        },
      });

      return SelectAccount.array().parse(response.data);
    },
  });
};
