import { SelectionRows } from './selection-rows'
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
import { newestActivityFirst } from '@/lib/sort-by-update-time'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const balanceFragment = graphql`
  fragment transactionAccountPickerBalanceFragment on Account {
    balance
  }
`

type Account = transactionAccountPickerBalanceFragment$key & {
  id: string
  name: string
  type: string
  latestTransaction?: { datetime: string } | null
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
  expanded: controlledExpanded,
  onExpand,
  disabled = false,
  preferredTypes,
}: TransactionAccountPickerProps) {
  const isMobile = useIsMobile()
  const [typeFilter, setTypeFilter] = useState<{
    type: string
    accountValue: string
  } | null>(null)
  const [editing, setEditing] = useState(false)
  const isControlled = controlledExpanded !== undefined
  const expanded = controlledExpanded ?? (!value || editing)
  const summaryRef = useRef<HTMLButtonElement>(null)
  const wasExpanded = useRef(expanded)

  useEffect(() => {
    if (isMobile && wasExpanded.current && !expanded) {
      summaryRef.current?.focus({ preventScroll: true })
    }
    wasExpanded.current = expanded
  }, [expanded, isMobile])
  const selected = accounts.find((account) => account.id === value)

  const preferredTypeSet = new Set(preferredTypes)
  const groups = ACCOUNT_TYPES.map(([type, title], typeIndex) => ({
    type,
    title,
    typeIndex,
    accounts: newestActivityFirst(
      accounts.filter((account) => account.type === type),
    ),
  }))
    .filter((group) => group.accounts.length > 0)
    .sort((a, b) => {
      const aPreferred = preferredTypes
        ? preferredTypeSet.has(a.type)
          ? 0
          : 1
        : 0
      const bPreferred = preferredTypes
        ? preferredTypeSet.has(b.type)
          ? 0
          : 1
        : 0
      const aActivityTime = a.accounts[0]?.latestTransaction?.datetime ?? ''
      const bActivityTime = b.accounts[0]?.latestTransaction?.datetime ?? ''
      return (
        aPreferred - bPreferred ||
        bActivityTime.localeCompare(aActivityTime) ||
        a.typeIndex - b.typeIndex
      )
    })
  const requestedType =
    typeFilter?.accountValue === value ? typeFilter.type : selected?.type
  const activeType =
    groups.find((group) => group.type === requestedType)?.type ??
    groups.find((group) => preferredTypes?.includes(group.type))?.type ??
    groups[0]?.type

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
              aria-label={`${label}: ${selected?.name ?? (disabled ? 'Select a source account first' : 'Select an account')}`}
              className="h-12 w-full justify-start gap-2 p-2 text-left font-normal"
            />
          }
        >
          {selected ? (
            <AccountDetails account={selected} />
          ) : (
            <span className="text-muted-foreground min-w-0 flex-1 truncate text-left">
              {disabled ? 'Select a source account first' : 'Select an account'}
            </span>
          )}
          <ChevronDownIcon data-icon="inline-end" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-none overflow-hidden p-0">
          <ScrollArea className="max-h-80 [&_[data-slot=scroll-area-viewport]]:max-h-80">
            <div className="p-1">
              {groups.map((group, index) => (
                <div key={group.type}>
                  {index > 0 ? <DropdownMenuSeparator /> : null}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{group.title}</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={value}
                      onValueChange={(nextValue) => {
                        if (typeof nextValue === 'string')
                          onValueChange(nextValue)
                      }}
                    >
                      {group.accounts.map((account) => (
                        <DropdownMenuRadioItem
                          key={account.id}
                          value={account.id}
                          aria-label={account.name}
                          closeOnClick
                          className="min-h-10 py-1.5"
                        >
                          <AccountDetails
                            account={account}
                            selected={value === account.id}
                          />
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (!expanded || disabled) {
    return (
      <button
        ref={summaryRef}
        type="button"
        id={name}
        disabled={disabled}
        aria-expanded={false}
        aria-label={`${label}: ${selected?.name ?? 'Select an account'}`}
        onClick={() => {
          if (isControlled) onExpand?.()
          else setEditing(true)
        }}
        className="border-input bg-background focus-visible:outline-ring flex min-h-11 w-full items-center gap-2 border p-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        <SelectionRows label={`${group.title} accounts`}>
          {group.accounts.map((account) => (
            <label
              key={account.id}
              className={cn(
                'border-input bg-background has-focus-visible:outline-ring flex min-h-11 w-max max-w-full min-w-44 shrink-0 cursor-pointer items-center border p-2 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2',
                value === account.id && 'border-primary',
              )}
            >
              <input
                type="radio"
                name={name}
                value={account.id}
                checked={value === account.id}
                onChange={() => {
                  onValueChange(account.id)
                  if (!isControlled) setEditing(false)
                }}
                onClick={() => {
                  if (value !== account.id) return
                  if (isControlled) onValueChange(account.id)
                  else setEditing(false)
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
        </SelectionRows>
      </div>
    ))

  return (
    <fieldset
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
      ) : groups.length === 1 ? (
        renderGroups(groups)
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
