import { createQueryOptions } from "@connectrpc/connect-query";
import { Transport } from "@connectrpc/connect";
import { getProfile } from "@/gen/proto/fijoy/v1/profile-ProfileService_connectquery";

type getProfileProps = {
  context: {
    transport: Transport;
  };
};

export const getProfileQueryOptions = ({ context }: getProfileProps) => {
  return createQueryOptions(getProfile, {}, { transport: context.transport });
};
