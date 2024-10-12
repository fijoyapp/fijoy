import { Transport } from "@connectrpc/connect";
import { createQueryOptions } from "@connectrpc/connect-query";
import {
  getAccount,
  getAccounts,
} from "@/gen/proto/fijoy/v1/account-AccountService_connectquery";
import { getProfileHeader } from "../headers";
import { Profile } from "@/gen/proto/fijoy/v1/profile_pb";

type getAccountsProps = {
  context: {
    transport: Transport;
    profile: Profile;
  };
};

export const getAccountsQueryOptions = ({ context }: getAccountsProps) => {
  return createQueryOptions(
    getAccounts,
    {},
    {
      transport: context.transport,
      callOptions: {
        headers: getProfileHeader(context.profile.id),
      },
    },
  );
};

type getAccountByIdProps = {
  id: string;
  context: {
    transport: Transport;
    profile: Profile;
  };
};

export const getAccountByIdQueryOptions = ({
  id,
  context,
}: getAccountByIdProps) => {
  return createQueryOptions(
    getAccount,
    { id },
    {
      transport: context.transport,
      callOptions: {
        headers: getProfileHeader(context.profile.id),
      },
    },
  );
};
