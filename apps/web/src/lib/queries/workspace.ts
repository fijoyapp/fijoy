import { createQueryOptions } from "@connectrpc/connect-query";
import { Transport } from "@connectrpc/connect";
import {
  getWorkspaceByNamespace,
  getWorkspaces,
} from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";

type getWorkspaceByNamespaceProps = {
  namespace: string;
  context: {
    transport: Transport;
  };
};

export const getWorkspaceByNamespaceQueryOptions = ({
  namespace,
  context,
}: getWorkspaceByNamespaceProps) => {
  return createQueryOptions(
    getWorkspaceByNamespace,
    { namespace },
    { transport: context.transport },
  );
};

type getWorkspacesProps = {
  context: {
    transport: Transport;
  };
};

export const getWorkspacesQueryOptions = ({ context }: getWorkspacesProps) => {
  return createQueryOptions(
    getWorkspaces,
    {},
    { transport: context.transport },
  );
};
