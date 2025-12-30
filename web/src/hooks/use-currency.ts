import currency from 'currency.js'
import { usePrivacyMode } from './use-privacy-mode'
import { useHousehold } from './use-household'

export function useCurrency() {
  const { isPrivacyModeEnabled } = usePrivacyMode()

  const { household } = useHousehold()

  const formatCurrency = (
    currencyValue: string | currency,
    currencyCode: string,
  ) => {
    const curr =
      typeof currencyValue === 'string'
        ? currency(currencyValue)
        : currencyValue

    const value = Intl.NumberFormat(household.locale, {
      currency: currencyCode,
      style: 'currency',
    }).format(curr.value)

    return value
  }

  const formatCurrencyWithPrivacyMode = (
    currencyValue: string | currency,
    currencyCode: string,
  ) => {
    if (isPrivacyModeEnabled) {
      return '•••••••'
    }

    const curr =
      typeof currencyValue === 'string'
        ? currency(currencyValue)
        : currencyValue

    const value = Intl.NumberFormat(household.locale, {
      currency: currencyCode,
      style: 'currency',
    }).format(curr.value)

    return value
  }

  return { formatCurrency, formatCurrencyWithPrivacyMode }
}
