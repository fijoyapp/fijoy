import { SelectTransaction } from "@/types/transaction";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../ky";

export const transactionsQueryOptions = (workspaceID: string) => {
  return queryOptions({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api
        .get("transactions", {
          searchParams: {
            workspace_id: workspaceID,
          },
        })
        .json();

      return SelectTransaction.array().parse(response);
    },
  });
};
