import { createContext } from "react";
import { createQueryOptions, useTransport } from "@connectrpc/connect-query";
import { Workspace } from "./gen/proto/fijoy/v1/workspace_pb";
import { getWorkspaceByNamespace } from "./gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface WorkspaceContext {
  workspace: Workspace;
  isLoading: boolean;
}

export const WorkspaceContext = createContext<WorkspaceContext | null>(null);

export function WorkspaceProvider({
  children,
  namespace,
}: {
  children: React.ReactNode;
  namespace: string;
}) {
  const transport = useTransport();
  const { data: workspace, isLoading } = useSuspenseQuery(
    createQueryOptions(getWorkspaceByNamespace, { namespace }, { transport }),
  );

  return (
    <WorkspaceContext.Provider value={{ workspace: workspace, isLoading }}>
      {children}
    </WorkspaceContext.Provider>
  );
}
