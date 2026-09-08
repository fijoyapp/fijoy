import currency from 'currency.js'
import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { Link } from '@tanstack/react-router'

import type { accountLedgerRowFragment$key } from './__generated__/accountLedgerRowFragment.graphql'
import {
  ACCOUNT_TYPE_ACCENT_CLASSES,
  formatPercentageWithPrivacyMode,
} from './account-ledger-utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'
import { usePrivacyMode } from '@/hooks/use-privacy-mode'
import { getLogoDomainURL } from '@/lib/logo'
import { getRelativeDate } from '@/lib/time'
import { cn } from '@/lib/utils'

const AccountLedgerRowFragment = graphql`
  fragment accountLedgerRowFragment on Account {
    id
    name
    type
    icon
    value
    balance
    latestTransaction {
      datetime
    }
    householdCurrency {
      code
    }
    user {
      name
    }
  }
`

type AccountLedgerRowProps = {
  fragmentRef: accountLedgerRowFragment$key
  displayValue: currency
  displayCurrencyCode: string
  share: number
}

export function AccountLedgerRow({
  fragmentRef,
  displayValue,
  displayCurrencyCode,
  share,
}: AccountLedgerRowProps) {
  const data = useFragment(AccountLedgerRowFragment, fragmentRef)
  const { household } = useHousehold()
  const { isPrivacyModeEnabled } = usePrivacyMode()
  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const balance = currency(data.balance)
  const value = currency(data.value)
  const isLiability = data.type === 'liability'
  const showCash =
    data.type === 'investment' && value.value !== 0 && balance.value !== 0
  const cashPercentage = showCash
    ? Math.abs((balance.value / value.value) * 100)
    : 0
  const accentClass = ACCOUNT_TYPE_ACCENT_CLASSES[data.type] ?? 'bg-chart-2'
  const shareLabel = formatPercentageWithPrivacyMode(
    share,
    household.locale,
    isPrivacyModeEnabled,
  )

  const activity = data.latestTransaction
    ? getRelativeDate(new Date(data.latestTransaction.datetime))
    : 'Never used'

  return (
    <Link
      className="group/account-row hover:bg-muted/60 focus-visible:border-ring focus-visible:ring-ring/30 border-t-border grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 border-t border-transparent px-3 py-2.5 text-xs/relaxed no-underline! transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset lg:min-h-12 lg:grid-cols-[minmax(13rem,1.45fr)_minmax(5rem,0.45fr)_minmax(7rem,0.65fr)_minmax(8rem,0.7fr)_minmax(8rem,0.75fr)_minmax(8rem,0.8fr)] lg:gap-x-4 lg:py-2"
      from="/household/$householdId"
      to="/household/$householdId/accounts/$accountId"
      search={(prev) => ({ ...prev })}
      activeOptions={{ exact: true }}
      activeProps={{ className: 'bg-muted/60' }}
      params={{ accountId: data.id }}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <Avatar size="sm" className="size-7 lg:size-6">
          <AvatarImage src={getLogoDomainURL(data.icon || '')} alt="" />
          <AvatarFallback aria-hidden="true">
            {data.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span
            className="truncate text-sm font-medium lg:text-xs/relaxed"
            title={data.name}
          >
            {data.name}
          </span>
          {showCash ? (
            <span className="text-muted-foreground truncate text-[0.6875rem] tabular-nums">
              Cash{' '}
              {formatCurrencyWithPrivacyMode({
                value: balance,
                currencyCode: data.householdCurrency.code,
              })}{' '}
              ·{' '}
              {formatPercentageWithPrivacyMode(
                cashPercentage,
                household.locale,
                isPrivacyModeEnabled,
              )}
            </span>
          ) : null}
        </div>
      </div>

      <span className="text-muted-foreground hidden truncate lg:block">
        {data.user.name}
      </span>
      <span className="text-muted-foreground hidden whitespace-nowrap lg:block">
        {activity}
      </span>
      <span className="hidden text-right tabular-nums lg:block">
        {formatCurrencyWithPrivacyMode({
          value,
          currencyCode: data.householdCurrency.code,
          liability: isLiability,
        })}
      </span>
      <span className="text-right text-sm font-medium tabular-nums lg:hidden">
        {formatCurrencyWithPrivacyMode({
          value,
          currencyCode: data.householdCurrency.code,
          liability: isLiability,
        })}
      </span>
      <span className="hidden text-right text-xs/relaxed font-medium tabular-nums lg:block">
        {formatCurrencyWithPrivacyMode({
          value: displayValue,
          currencyCode: displayCurrencyCode,
          liability: isLiability,
        })}
      </span>

      <div className="hidden min-w-0 flex-col gap-1 lg:flex">
        <span className="text-muted-foreground text-right tabular-nums">
          {shareLabel}
        </span>
        <AllocationRail
          value={share}
          accentClass={accentClass}
          hidden={isPrivacyModeEnabled}
        />
      </div>

      <span className="text-muted-foreground truncate lg:hidden">
        {data.user.name} · {activity}
      </span>
      <span className="text-muted-foreground text-right text-[0.6875rem] tabular-nums lg:hidden">
        {displayCurrencyCode} ·{' '}
        {formatCurrencyWithPrivacyMode({
          value: displayValue,
          currencyCode: displayCurrencyCode,
          liability: isLiability,
        })}
      </span>
      <div className="col-span-2 flex items-center gap-2 lg:hidden">
        <AllocationRail
          value={share}
          accentClass={accentClass}
          hidden={isPrivacyModeEnabled}
          className="flex-1"
        />
        <span className="text-muted-foreground w-12 text-right text-[0.625rem] tabular-nums">
          {shareLabel}
        </span>
      </div>
    </Link>
  )
}

type AllocationRailProps = {
  value: number
  accentClass: string
  hidden: boolean
  className?: string
}

function AllocationRail({
  value,
  accentClass,
  hidden,
  className,
}: AllocationRailProps) {
  const width = hidden ? 0 : Math.min(100, Math.max(0, value))

  return (
    <span
      aria-hidden="true"
      className={cn('bg-border block h-1 overflow-hidden', className)}
    >
      <span
        className={cn('block h-full', accentClass)}
        style={{ width: `${width}%` }}
      />
    </span>
  )
}
