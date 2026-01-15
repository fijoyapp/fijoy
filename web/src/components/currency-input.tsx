import { NumericFormat } from 'react-number-format'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

type CurrencyInputProps = React.ComponentProps<typeof NumericFormat> & {
  locale: string
  currency: string
}

export function CurrencyInput({
  className,
  locale,
  currency,
  ...props
}: CurrencyInputProps) {
  // Get the currency symbol for the given locale and currency
  const currencySymbol = useMemo(() => {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(0)

    // Extract just the symbol (remove the 0 and any spaces/punctuation)
    return formatted.replace(/[\d\s.,]/g, '')
  }, [locale, currency])

  // Get thousand and decimal separators for the locale
  const { thousandSeparator, decimalSeparator } = useMemo(() => {
    const parts = new Intl.NumberFormat(locale).formatToParts(1000.1)
    return {
      thousandSeparator:
        parts.find((part) => part.type === 'group')?.value || ',',
      decimalSeparator:
        parts.find((part) => part.type === 'decimal')?.value || '.',
    }
  }, [locale])

  return (
    <NumericFormat
      data-slot="input"
      inputMode="decimal"
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      prefix={currencySymbol}
      decimalScale={2}
      fixedDecimalScale={false}
      allowNegative={false}
      className={cn(
        'bg-input/20 dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-7 rounded-md border px-2 py-0.5 text-sm transition-colors file:h-6 file:text-xs/relaxed file:font-medium focus-visible:ring-[2px] aria-invalid:ring-[2px] md:text-xs/relaxed file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
