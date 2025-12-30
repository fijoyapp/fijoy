import { useHousehold } from '@/hooks/use-household'
import { cn } from '@/lib/utils'
import I18nCurrencyInput from '@houdiniproject/react-i18n-currency-input'

type CurrencyInputProps = React.ComponentProps<typeof I18nCurrencyInput>

export function CurrencyInput({ className, ...props }: CurrencyInputProps) {
  const { household } = useHousehold()
  return (
    <I18nCurrencyInput
      data-slot="input"
      className={cn(
        'bg-input/20 dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-7 rounded-md border px-2 py-0.5 text-sm transition-colors file:h-6 file:text-xs/relaxed file:font-medium focus-visible:ring-[2px] aria-invalid:ring-[2px] md:text-xs/relaxed file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      currency={household.currency.code}
      locale={household.locale}
      currencyDisplay="symbol"
      {...props}
    />
  )
}
