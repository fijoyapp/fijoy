// import { accountTypeConfigMap } from "@/config/account";
// import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
// import { Money } from "@/gen/proto/fijoy/v1/money_pb";
import currency from "currency.js";
//
// export const moneyToCurrency = (money: Money): currency => {
//   const total = Number(String(money.units)) + Number(String(money.nanos)) / 1e8;
//
//   return currency(total);
// };
//
export const getCurrencyDisplay = (
  money: string,
  code: string,
  locale: string,
  opts: { compact: boolean; isDebt?: boolean },
): string => {
  const curr = currency(money);

  return Intl.NumberFormat(locale, {
    currency: code,
    style: "currency",
    notation: opts.compact ? "compact" : "standard",
  }).format(opts.isDebt ? curr.multiply(-1).value : curr.value);
};

// export const calculateStats = (accounts: Account[], isDebt: boolean) => {
//   return accounts
//     .filter(
//       (a) =>
//         a.accountType !== AccountType.UNSPECIFIED &&
//         accountTypeConfigMap[a.accountType].isDebt === isDebt,
//     )
//     .reduce((acc, cur) => {
//       if (!cur.balance) {
//         throw new Error("Balance is missing");
//       }
//       return acc.add(moneyToCurrency(cur.balance));
//     }, currency(0));
// };
