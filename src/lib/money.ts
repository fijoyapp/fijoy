export const getMoneyDisplay = (
  money: number,
  opts: { isDebt?: boolean; compact?: boolean } = {
    isDebt: false,
    compact: false,
  },
): string => {
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    notation: opts.compact ? "compact" : "standard",
  });
  if (opts.isDebt) {
    return formatter.format(-money);
  }
  return formatter.format(money);
};
