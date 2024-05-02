import { Transport } from "@connectrpc/connect";
import { createQueryOptions } from "@connectrpc/connect-query";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { getWorkspaceHeader } from "../headers";
import { getCategories } from "@/gen/proto/fijoy/v1/category-CategoryService_connectquery";

type getCategoriesProps = {
  context: {
    transport: Transport;
    workspace: Workspace;
  };
};

export const getCategoriesQueryOptions = ({ context }: getCategoriesProps) => {
  return createQueryOptions(
    getCategories,
    {},
    {
      transport: context.transport,
      callOptions: {
        headers: getWorkspaceHeader(context.workspace.id),
      },
    },
  );
};
