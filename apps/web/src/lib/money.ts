import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
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
  opts: { compact: boolean; locale: string },
): string => {
  return Intl.NumberFormat(opts.locale, {
    currency: code,
    style: "currency",
    notation: opts.compact ? "compact" : "standard",
  }).format(money.value);
};

export const calculateStats = (accounts: Account[], isDebt: boolean) => {
  return accounts
    .filter(
      (a) =>
        a.accountType !== AccountType.UNSPECIFIED &&
        accountTypeConfigMap[a.accountType].isDebt === isDebt,
    )
    .reduce((acc, cur) => {
      if (!cur.balance) return acc;
      const balance = moneyToCurrency(cur.balance, { reverse: isDebt });
      return acc.add(balance);
    }, currency(0));
};
