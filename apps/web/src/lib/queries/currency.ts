import { Transport } from "@connectrpc/connect";
import { createQueryOptions } from "@connectrpc/connect-query";
import { getCurrencies } from "@/gen/proto/fijoy/v1/currency-CurrencyService_connectquery";

type getCurrenciesProps = {
  context: {
    transport: Transport;
  };
};

export const getCurrenciesQueryOptions = ({ context }: getCurrenciesProps) => {
  return createQueryOptions(
    getCurrencies,
    {},
    {
      transport: context.transport,
    },
  );
};
