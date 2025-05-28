import currency from "currency.js";

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
