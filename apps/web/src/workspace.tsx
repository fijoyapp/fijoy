import { createContext, useContext } from "react";
import { createQueryOptions, useTransport } from "@connectrpc/connect-query";
import { Workspace } from "./gen/proto/fijoy/v1/workspace_pb";
import { getWorkspaceByNamespace } from "./gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { useSuspenseQuery } from "@tanstack/react-query";

export interface WorkspaceContext {
  workspace: Workspace;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContext | null>(null);

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
  console.log(workspace);

  return (
    <WorkspaceContext.Provider value={{ workspace: workspace, isLoading }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within an WorkspaceProvider");
  }
  return context;
}
