import { env } from "@/env";
import { SelectTransaction } from "@/types/transaction";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const transactionsQueryOptions = (workspaceID: string) => {
  return queryOptions({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await axios.get(env.VITE_BACKEND_URL + "/transaction", {
        withCredentials: true,
        params: {
          workspace_id: workspaceID,
        },
      });

      return SelectTransaction.array().parse(response.data);
    },
  });
};
