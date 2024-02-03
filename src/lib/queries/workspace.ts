import { env } from "@/env";
import { SelectWorkspace } from "@/types/workspace";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const workspacesQueryOptions = () => {
  return queryOptions({
    queryKey: ["workspace"],
    queryFn: async () => {
      const response = await axios.get(env.VITE_BACKEND_URL + "/workspace", {
        withCredentials: true,
        params: {},
      });

      return SelectWorkspace.array().parse(response.data);
    },
  });
};
