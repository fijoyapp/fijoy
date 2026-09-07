import { Tabs } from '@base-ui/react/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { graphql, useFragment } from 'react-relay'
import type { transactionAccountPickerBalanceFragment$key } from './__generated__/transactionAccountPickerBalanceFragment.graphql'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDownIcon, WalletIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import { useCurrency } from '@/hooks/use-currency'
import { getLogoDomainURL } from '@/lib/logo'
import { cn } from '@/lib/utils'

const balanceFragment = graphql`
  fragment transactionAccountPickerBalanceFragment on Account {
    balance
  }
`

type Account = transactionAccountPickerBalanceFragment$key & {
  id: string
  name: string
  type: string
  icon?: string | null
  householdCurrency: { code: string }
}

type TransactionAccountPickerProps = {
  accounts: ReadonlyArray<Account>
  name: string
  label: string
  value: string
  onValueChange: (value: string) => void
  onBlur: () => void
  invalid: boolean
  children: ReactNode
  expanded?: boolean
  onExpand?: () => void
  disabled?: boolean
  preferredTypes?: ReadonlyArray<string>
}

const ACCOUNT_TYPES = [
  ['liquidity', 'Liquidity'],
  ['investment', 'Investment'],
  ['property', 'Property'],
  ['receivable', 'Receivable'],
  ['liability', 'Liability'],
] as const

export function TransactionAccountPicker({
  accounts,
  name,
  label,
  value,
  onValueChange,
  onBlur,
  invalid,
  children,
  expanded = true,
  onExpand,
  disabled = false,
  preferredTypes,
}: TransactionAccountPickerProps) {
  const isMobile = useIsMobile()
  const [typeFilter, setTypeFilter] = useState<{
    type: string
    accountValue: string
  } | null>(null)
  const pickerRef = useRef<HTMLFieldSetElement>(null)
  const summaryRef = useRef<HTMLButtonElement>(null)
  const wasExpanded = useRef(expanded)
  useEffect(() => {
    if (isMobile && wasExpanded.current && !expanded) {
      summaryRef.current?.focus({ preventScroll: true })
    }
    wasExpanded.current = expanded
  }, [expanded, isMobile])
  const selected = accounts.find((account) => account.id === value)

  const groups = ACCOUNT_TYPES.map(([type, title]) => ({
    type,
    title,
    accounts: accounts.filter((account) => account.type === type),
  })).filter((group) => group.accounts.length > 0)
  const requestedType =
    typeFilter?.accountValue === value ? typeFilter.type : selected?.type
  const activeType =
    groups.find((group) => group.type === requestedType)?.type ??
    groups.find((group) => preferredTypes?.includes(group.type))?.type ??
    groups[0]?.type

  useEffect(() => {
    if (!isMobile || !expanded) return
    const input =
      pickerRef.current?.querySelector<HTMLInputElement>('input:checked')
    const tile = input?.closest('label')
    const strip = tile?.closest<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    )
    if (tile && strip) {
      strip.scrollLeft +=
        tile.getBoundingClientRect().left - strip.getBoundingClientRect().left
    }
  }, [isMobile, expanded, value, activeType])

  if (!isMobile) return children

  if (!expanded || disabled) {
    return (
      <button
        ref={summaryRef}
        type="button"
        id={name}
        disabled={disabled}
        aria-expanded={false}
        aria-label={`${label}: ${selected?.name ?? 'Select an account'}`}
        onClick={onExpand}
        className="border-input bg-background focus-visible:outline-ring flex min-h-11 w-full items-center gap-3 border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selected ? (
          <AccountDetails account={selected} />
        ) : (
          <span className="text-muted-foreground flex-1 text-xs">
            {disabled ? 'Select a source account first' : 'Select an account'}
          </span>
        )}
        <ChevronDownIcon className="size-4 shrink-0" aria-hidden="true" />
      </button>
    )
  }

  const renderGroups = (accountGroups: typeof groups) =>
    accountGroups.map((group) => (
      <div key={group.type} className="flex min-w-0 flex-col gap-0.5">
        <ScrollArea className="w-full min-w-0 overflow-hidden [&_[data-slot=scroll-area-scrollbar]]:hidden">
          <div
            role="group"
            aria-label={`${group.title} accounts`}
            className="flex w-max gap-2"
          >
            {group.accounts.map((account) => (
              <label
                key={account.id}
                className={cn(
                  'border-input bg-background has-focus-visible:outline-ring flex min-h-11 w-52 shrink-0 cursor-pointer items-center border p-2 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2',
                  value === account.id && 'border-primary',
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={account.id}
                  checked={value === account.id}
                  onChange={() => onValueChange(account.id)}
                  onClick={() => {
                    if (value === account.id) onValueChange(account.id)
                  }}
                  aria-invalid={invalid}
                  className="sr-only"
                />
                <AccountDetails
                  account={account}
                  selected={value === account.id}
                />
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>
    ))

  return (
    <fieldset
      ref={pickerRef}
      id={name}
      aria-invalid={invalid}
      className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onBlur()
      }}
    >
      <legend className="sr-only">{label}</legend>
      {accounts.length === 0 ? (
        <p className="text-muted-foreground text-xs">No accounts available.</p>
      ) : (
        <Tabs.Root
          value={activeType}
          onValueChange={(type) => {
            if (typeof type === 'string')
              setTypeFilter({ type, accountValue: value })
          }}
          className="flex min-w-0 flex-col gap-2"
        >
          <ScrollArea className="w-full min-w-0 overflow-hidden [&_[data-slot=scroll-area-scrollbar]]:hidden">
            <Tabs.List
              aria-label={`${label} type`}
              className="border-border divide-border flex w-max divide-x border"
            >
              {groups.map((group) => (
                <Tabs.Tab
                  key={group.type}
                  value={group.type}
                  className="focus-visible:ring-ring/30 text-muted-foreground hover:text-foreground hover:bg-background/50 data-active:text-foreground data-active:outline-primary inline-flex h-6 shrink-0 cursor-pointer items-center justify-center gap-1.5 px-2.5 text-xs font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 data-active:outline-1 data-active:-outline-offset-1"
                >
                  {group.title}
                  <span
                    className="tabular-nums"
                    aria-label={`${group.accounts.length} accounts`}
                  >
                    {group.accounts.length}
                  </span>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </ScrollArea>
          {groups.map((group) => (
            <Tabs.Panel
              key={group.type}
              value={group.type}
              className="min-w-0 outline-none"
            >
              {renderGroups([group])}
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      )}
    </fieldset>
  )
}

function AccountDetails({
  account,
  selected = false,
}: {
  account: Account
  selected?: boolean
}) {
  const { balance } = useFragment(balanceFragment, account)
  const { formatCurrencyWithPrivacyMode } = useCurrency()
  return (
    <span className="flex min-w-0 flex-1 items-center gap-2">
      <Avatar size="sm">
        {account.icon && (
          <AvatarImage src={getLogoDomainURL(account.icon)} alt="" />
        )}
        <AvatarFallback>
          <WalletIcon className="size-4" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
      <span className="flex min-w-0 flex-1 flex-col text-xs leading-4">
        <span className="truncate" title={account.name}>
          {account.name}
        </span>
        <span
          className={cn(
            'wrap-anywhere tabular-nums',
            selected ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {formatCurrencyWithPrivacyMode({
            value: balance,
            currencyCode: account.householdCurrency.code,
            liability: account.type === 'liability',
          })}
          <span> {account.householdCurrency.code}</span>
        </span>
      </span>
    </span>
  )
}
