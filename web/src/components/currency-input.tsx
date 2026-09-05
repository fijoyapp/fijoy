import { NumericFormat } from 'react-number-format'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useCurrencyConfig } from '@/hooks/use-currency-config'

type CurrencyInputProps = React.ComponentProps<typeof NumericFormat> & {
  locale: string
  currency: string
}

export function CurrencyInput({
  className,
  locale,
  currency,
  onFocus,
  onBlur,
  onValueChange,
  ...props
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isEditingDecimal, setIsEditingDecimal] = useState(false)

  const { prefix, suffix, thousandSeparator, decimalSeparator } =
    useCurrencyConfig(locale, currency)

  return (
    <NumericFormat
      data-slot="input"
      inputMode="decimal"
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      prefix={prefix}
      suffix={suffix}
      decimalScale={2}
      fixedDecimalScale={isFocused && isEditingDecimal}
      onValueChange={(values, sourceInfo) => {
        setIsEditingDecimal(values.value.includes('.'))
        onValueChange?.(values, sourceInfo)
      }}
      onFocus={(e) => {
        setIsFocused(true)
        onFocus?.(e)
      }}
      onBlur={(e) => {
        setIsFocused(false)
        onBlur?.(e)
      }}
      className={cn(
        'bg-input/20 dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 file:text-foreground placeholder:text-muted-foreground h-7 w-full min-w-0 rounded-md border px-2 py-0.5 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium focus-visible:ring-[2px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[2px] md:text-xs/relaxed',
        className,
      )}
      {...props}
    />
  )
}
