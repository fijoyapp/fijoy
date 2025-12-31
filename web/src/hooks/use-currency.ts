import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import currency from 'currency.js'
import { usePrivacyMode } from './use-privacy-mode'
import type { useCurrencyQuery } from './__generated__/useCurrencyQuery.graphql'

const useCurrencyQuery = graphql`
  query useCurrencyQuery {
    households {
      locale
    }
  }
`

type FormatCurrencyArgs = {
  value: string | currency
  currencyCode: string
  liability?: boolean
}

export function useCurrency() {
  const data = useLazyLoadQuery<useCurrencyQuery>(
    useCurrencyQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  )

  const { isPrivacyModeEnabled } = usePrivacyMode()

  // TODO: DO NOT HARD CODE LOCALE
  const defaultLocale = data.households[0]?.locale || 'en-CA'

  const formatCurrency = ({
    value,
    currencyCode,
    liability,
  }: FormatCurrencyArgs) => {
    const curr = typeof value === 'string' ? currency(value) : value

    const formatted = Intl.NumberFormat(defaultLocale, {
      currency: currencyCode,
      style: 'currency',
    }).format(liability ? -curr.value : curr.value)

    return formatted
  }

  const formatCurrencyWithPrivacyMode = (args: FormatCurrencyArgs) => {
    if (isPrivacyModeEnabled) {
      return '•••••••'
    }

    return formatCurrency(args)
  }

  return { formatCurrency, formatCurrencyWithPrivacyMode }
}
