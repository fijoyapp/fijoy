import { SelectAccount } from "@/types/account";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../ky";

export const accountsQueryOptions = (workspaceID: string) => {
  return queryOptions({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await api
        .get("/accounts", {
          searchParams: {
            workspace_id: workspaceID,
          },
        })
        .json();

      return SelectAccount.array().parse(response);
    },
  });
};
