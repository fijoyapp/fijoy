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

export const currencyToDisplay = (
  money: currency,
  code: string,
  opts: { compact: boolean } = { compact: false },
): string => {
  // TODO: let the user pick the locale instead
  return Intl.NumberFormat(navigator.language, {
    currency: code,
    style: "currency",
    notation: opts.compact ? "compact" : "standard",
  }).format(money.value);
};
