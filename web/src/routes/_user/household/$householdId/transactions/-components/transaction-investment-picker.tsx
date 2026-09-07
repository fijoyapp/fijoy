import type { ReactNode } from 'react'
import { ChartNoAxesCombinedIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIsMobile } from '@/hooks/use-mobile'
import { getLogoCryptoURL, getLogoTickerURL } from '@/lib/logo'
import { cn } from '@/lib/utils'

type Investment = {
  id: string
  name: string
  symbol: string
  type: string
  accountName?: string
}

type Props = {
  investments: ReadonlyArray<Investment>
  name: string
  label: string
  value: string
  onValueChange: (value: string) => void
  onBlur: () => void
  invalid: boolean
  disabled?: boolean
  disabledMessage?: string
  children: ReactNode
}

export function TransactionInvestmentPicker({
  investments,
  name,
  label,
  value,
  onValueChange,
  onBlur,
  invalid,
  disabled = false,
  disabledMessage = 'Select an account first',
  children,
}: Props) {
  const isMobile = useIsMobile()
  if (!isMobile) return children

  return (
    <fieldset
      id={name}
      disabled={disabled}
      aria-invalid={invalid}
      className="m-0 min-w-0 border-0 p-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onBlur()
      }}
    >
      <legend className="sr-only">{label}</legend>
      {disabled || investments.length === 0 ? (
        <p className="text-muted-foreground text-xs">
          {disabled ? disabledMessage : 'No matching investments available.'}
        </p>
      ) : (
        <ScrollArea className="w-full min-w-0 overflow-hidden [&_[data-slot=scroll-area-scrollbar]]:hidden">
          <div className="flex w-max gap-2">
            {investments.map((investment) => (
              <label
                key={investment.id}
                className={cn(
                  'border-input bg-background has-focus-visible:outline-ring flex min-h-11 w-52 shrink-0 cursor-pointer items-center gap-2 border p-2 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2',
                  value === investment.id && 'border-primary',
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={investment.id}
                  checked={value === investment.id}
                  onChange={() => onValueChange(investment.id)}
                  aria-invalid={invalid}
                  className="sr-only"
                />
                <Avatar size="sm">
                  <AvatarImage
                    src={
                      investment.type === 'crypto'
                        ? getLogoCryptoURL(investment.symbol)
                        : getLogoTickerURL(investment.symbol)
                    }
                    alt=""
                  />
                  <AvatarFallback>
                    <ChartNoAxesCombinedIcon
                      className="size-4"
                      aria-hidden="true"
                    />
                  </AvatarFallback>
                </Avatar>
                <span className="flex min-w-0 flex-1 flex-col text-xs leading-4">
                  <span className="truncate" title={investment.name}>
                    {investment.name}
                  </span>
                  <span
                    className="text-muted-foreground truncate"
                    title={investment.accountName}
                  >
                    {investment.symbol}
                    {investment.accountName
                      ? ` · ${investment.accountName}`
                      : ''}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </ScrollArea>
      )}
    </fieldset>
  )
}
