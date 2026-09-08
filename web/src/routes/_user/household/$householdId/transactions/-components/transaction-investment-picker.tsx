import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChartNoAxesCombinedIcon, ChevronDownIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SelectionRows } from '@/components/selection-rows'
import { useIsMobile } from '@/hooks/use-mobile'
import { getLogoCryptoURL, getLogoTickerURL } from '@/lib/logo'
import { cn } from '@/lib/utils'
import { newestActivityFirst } from '@/lib/sort-by-update-time'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Investment = {
  id: string
  name: string
  symbol: string
  type: string
  latestTransaction?: { datetime: string } | null
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
}: Props) {
  const isMobile = useIsMobile()
  const [editing, setEditing] = useState(false)
  const expanded = !value || editing
  const summaryRef = useRef<HTMLButtonElement>(null)
  const wasExpanded = useRef(expanded)
  const orderedInvestments = newestActivityFirst(investments)
  const selected = orderedInvestments.find(
    (investment) => investment.id === value,
  )

  useEffect(() => {
    if (isMobile && wasExpanded.current && !expanded) {
      summaryRef.current?.focus({ preventScroll: true })
    }
    wasExpanded.current = expanded
  }, [expanded, isMobile])

  if (!isMobile) {
    return (
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open) onBlur()
        }}
      >
        <DropdownMenuTrigger
          render={
            <Button
              id={name}
              name={name}
              type="button"
              variant="outline"
              disabled={disabled}
              aria-invalid={invalid}
              aria-label={`${label}: ${selected ? `${selected.name}, ${selected.symbol}` : disabled ? disabledMessage : 'Select an investment'}`}
              className="h-auto min-h-10 w-full justify-between px-2 py-1.5 text-left font-normal"
            />
          }
        >
          {selected ? (
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <InvestmentDetails investment={selected} />
            </span>
          ) : (
            <span className="text-muted-foreground min-w-0 flex-1 truncate text-left">
              {disabled ? disabledMessage : 'Select an investment'}
            </span>
          )}
          <ChevronDownIcon data-icon="inline-end" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-none overflow-hidden p-0">
          <ScrollArea className="max-h-80 [&_[data-slot=scroll-area-viewport]]:max-h-80">
            <div className="p-1">
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup
                  value={value}
                  onValueChange={(nextValue) => {
                    if (typeof nextValue === 'string') onValueChange(nextValue)
                  }}
                >
                  {orderedInvestments.map((investment) => (
                    <DropdownMenuRadioItem
                      key={investment.id}
                      value={investment.id}
                      aria-label={`${investment.name}, ${investment.symbol}`}
                      closeOnClick
                      className="min-h-10 py-1.5"
                    >
                      <InvestmentDetails investment={investment} />
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (!expanded && selected) {
    return (
      <button
        ref={summaryRef}
        type="button"
        id={name}
        aria-expanded={false}
        aria-label={`${label}: ${selected.name}`}
        onClick={() => setEditing(true)}
        className="border-input bg-background focus-visible:outline-ring flex min-h-11 w-full items-center gap-2 border p-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <InvestmentDetails investment={selected} />
        <ChevronDownIcon className="size-4 shrink-0" aria-hidden="true" />
      </button>
    )
  }

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
        <SelectionRows label={label}>
          {orderedInvestments.map((investment) => (
            <label
              key={investment.id}
              className={cn(
                'border-input bg-background has-focus-visible:outline-ring flex min-h-11 w-max max-w-64 shrink-0 cursor-pointer items-center gap-2 border p-2 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2',
                value === investment.id && 'border-primary',
              )}
            >
              <input
                type="radio"
                name={name}
                value={investment.id}
                checked={value === investment.id}
                onChange={() => {
                  onValueChange(investment.id)
                  setEditing(false)
                }}
                onClick={() => {
                  if (value === investment.id) setEditing(false)
                }}
                aria-invalid={invalid}
                className="sr-only"
              />
              <InvestmentDetails investment={investment} />
            </label>
          ))}
        </SelectionRows>
      )}
    </fieldset>
  )
}

function InvestmentDetails({ investment }: { investment: Investment }) {
  return (
    <>
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
          <ChartNoAxesCombinedIcon className="size-4" aria-hidden="true" />
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
          {investment.accountName ? ` · ${investment.accountName}` : ''}
        </span>
      </span>
    </>
  )
}
