import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type useCurrencyQuery } from './__generated__/useCurrencyQuery.graphql'
import currency from 'currency.js'
import { usePrivacyMode } from './use-privacy-mode'

const useCurrencyQuery = graphql`
  query useCurrencyQuery {
    households {
      locale
    }
  }
`

export function useCurrency() {
  const data = useLazyLoadQuery<useCurrencyQuery>(
    useCurrencyQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  )

  const { isPrivacyModeEnabled } = usePrivacyMode()

  // TODO: DO NOT HARD CODE LOCALE
  const defaultLocale = data.households[0]?.locale || 'en-CA'

  const formatCurrency = (
    currencyValue: string | currency,
    currencyCode: string,
  ) => {
    const curr =
      typeof currencyValue === 'string'
        ? currency(currencyValue)
        : currencyValue

    // TODO: DO NOT HARD CODE LOCALE
    const value = Intl.NumberFormat(defaultLocale, {
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

    // TODO: DO NOT HARD CODE LOCALE
    const value = Intl.NumberFormat(defaultLocale, {
      currency: currencyCode,
      style: 'currency',
    }).format(curr.value)

    return value
  }

  return { formatCurrency, formatCurrencyWithPrivacyMode }
}
