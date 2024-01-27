import { env } from "@/env";
import { Workspace } from "@/types/workspace";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const workspacesQueryOptions = () =>
  queryOptions({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await axios.get(env.VITE_BACKEND_URL + "/workspace", {
        withCredentials: true,
      });

      return Workspace.array().parse(response.data);
    },
  });
