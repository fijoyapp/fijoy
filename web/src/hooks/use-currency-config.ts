import { useMemo } from 'react'

export function useCurrencyConfig(locale: string, currency: string) {
  return useMemo(() => {
    const parts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).formatToParts(1234567.89)

    const symbol = parts.find((p) => p.type === 'currency')?.value || ''
    const thousandSeparator = parts.find((p) => p.type === 'group')?.value || ''
    const decimalSeparator =
      parts.find((p) => p.type === 'decimal')?.value || ''

    const isSymbolFirst = parts[0].type === 'currency'

    return {
      prefix: isSymbolFirst ? symbol : '',
      suffix: isSymbolFirst ? '' : ` ${symbol}`,
      thousandSeparator,
      decimalSeparator,
    }
  }, [locale, currency])
}
