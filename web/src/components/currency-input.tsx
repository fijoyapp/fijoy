import { NumberFormatBase } from 'react-number-format'
import { cn } from '@/lib/utils'

type CurrencyInputProps = React.ComponentProps<typeof NumberFormatBase> & {
  maximumFractionDigits?: number
}

export function CurrencyInput({
  className,
  locale,
  currency,
  maximumFractionDigits = 2,
  ...props
}: CurrencyInputProps & {
  locale: string
  currency: string
}) {
  const format = (val: string) => {
    if (!val) return ''

    const numberValue = parseFloat(val)
    if (isNaN(numberValue)) return ''

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits,
    }).format(numberValue)
  }

  const removeFormatting = (val: string) => {
    // Remove all non-numeric characters except decimal point and minus
    return val.replace(/[^\d.-]/g, '')
  }
  return (
    <NumberFormatBase
      data-slot="input"
      format={format}
      removeFormatting={removeFormatting}
      inputMode="decimal"
      className={cn(
        'bg-input/20 dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-7 rounded-md border px-2 py-0.5 text-sm transition-colors file:h-6 file:text-xs/relaxed file:font-medium focus-visible:ring-[2px] aria-invalid:ring-[2px] md:text-xs/relaxed file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
