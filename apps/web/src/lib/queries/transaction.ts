import { Transport } from "@connectrpc/connect";
import { createQueryOptions } from "@connectrpc/connect-query";
import { getTransactions } from "@/gen/proto/fijoy/v1/transaction-TransactionService_connectquery";
import { Profile } from "@/gen/proto/fijoy/v1/profile_pb";

type getTransactionsProps = {
  context: {
    transport: Transport;
    profile: Profile;
  };
};

export const getTransactionsQueryOptions = ({
  context,
}: getTransactionsProps) => {
  return createQueryOptions(
    getTransactions,
    {},
    {
      transport: context.transport,
    },
  );
};
