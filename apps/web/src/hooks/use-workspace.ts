import { WorkspaceContext } from "@/workspace";
import { useContext } from "react";

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within an WorkspaceProvider");
  }
  return context;
}
