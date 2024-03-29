import { Transport } from "@connectrpc/connect";
import { createQueryOptions } from "@connectrpc/connect-query";
import {
  getAccountById,
  getAccounts,
} from "@/gen/proto/fijoy/v1/account-AccountService_connectquery";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { getWorkspaceHeader } from "../headers";

type getAccountsProps = {
  context: {
    transport: Transport;
    workspace: Workspace;
  };
};

export const getAccountsQueryOptions = ({ context }: getAccountsProps) => {
  return createQueryOptions(
    getAccounts,
    {},
    {
      transport: context.transport,
      callOptions: {
        headers: getWorkspaceHeader(context.workspace.id),
      },
    },
  );
};

type getAccountByIdProps = {
  id: string;
  context: {
    transport: Transport;
    workspace: Workspace;
  };
};

export const getAccountByIdQueryOptions = ({
  id,
  context,
}: getAccountByIdProps) => {
  return createQueryOptions(
    getAccountById,
    { id },
    {
      transport: context.transport,
      callOptions: {
        headers: getWorkspaceHeader(context.workspace.id),
      },
    },
  );
};
