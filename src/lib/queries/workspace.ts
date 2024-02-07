import { SelectWorkspace } from "@/types/workspace";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../ky";

export const workspacesQueryOptions = () => {
  return queryOptions({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await api.get("/workspaces", {}).json();

      return SelectWorkspace.array().parse(response);
    },
  });
};
