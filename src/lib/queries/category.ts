import { env } from "@/env";
import { SelectCategory } from "@/types/category";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const categoriesQueryOptions = (workspaceID: string) => {
  return queryOptions({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get(env.VITE_BACKEND_URL + `/category`, {
        withCredentials: true,
        params: {
          workspace_id: workspaceID,
        },
      });
      return SelectCategory.array().parse(res.data);
    },
  });
};
