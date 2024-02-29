import { SelectCategory } from "@/types/category";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../ky";

export const categoriesQueryOptions = (workspaceID: string) => {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api
        .get(`categories`, {
          searchParams: {
            workspace_id: workspaceID,
          },
        })
        .json();
      return SelectCategory.array().parse(res);
    },
  });
};
