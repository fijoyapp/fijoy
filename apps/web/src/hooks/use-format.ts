import currency from "currency.js";
import { useProfile } from "./use-profile";
import { useCallback } from "react";

export function useFormat() {
  const { profile } = useProfile();

  const getCurrencyDisplay = useCallback(
    (
      quantity: string,
      currencyCode: string,
      locale?: string,
      opts?: Intl.NumberFormatOptions,
    ): string => {
      const curr = currency(quantity);

      return Intl.NumberFormat(locale ?? profile.locale, {
        ...opts,
        currency: currencyCode,
        style: "currency",
      }).format(curr.value);
    },
    [profile.locale],
  );

  return { getCurrencyDisplay };
}
