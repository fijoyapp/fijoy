import { Money } from "@/gen/proto/fijoy/v1/money_pb";
import currency from "currency.js";

export const moneyToCurrency = (
  money: Money,
  opts: {
    reverse?: boolean;
  } = {
    reverse: false,
  },
): currency => {
  const total = Number(String(money.units)) + Number(String(money.nanos)) / 1e8;

  return currency(opts.reverse ? -total : total);
};

export const ALL_CURRENCIES = Intl.supportedValuesOf("currency");
