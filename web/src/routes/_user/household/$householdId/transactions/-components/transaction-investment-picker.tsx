import { useEffect } from 'react'
import { ChartNoAxesCombinedIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import { getLogoCryptoURL, getLogoTickerURL } from '@/lib/logo'
import { newestActivityFirst } from '@/lib/sort-by-update-time'
import { graphql } from 'react-relay'
import { readInlineData } from 'relay-runtime'
import type { transactionInvestmentPickerFragment$key } from './__generated__/transactionInvestmentPickerFragment.graphql'
import { DesktopSelectionPopover } from '@/components/desktop-selection-popover'
import { MobileSelectionDrawer } from '@/components/mobile-selection-drawer'

const investmentFragment = graphql`
  fragment transactionInvestmentPickerFragment on Investment @inline {
    name
    symbol
    type
    latestTransaction {
      datetime
    }
  }
`

type Investment = transactionInvestmentPickerFragment$key & {
  id: string
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
  const orderedInvestments = newestActivityFirst(
    investments.map((investment) => {
      const latestTransaction = investmentData(investment).latestTransaction
      return {
        investment,
        latestTransaction: latestTransaction
          ? { datetime: latestTransaction.datetime }
          : latestTransaction,
      }
    }),
  ).map(({ investment }) => investment)
  const selected = orderedInvestments.find(
    (investment) => investment.id === value,
  )
  const selectionAvailable = !value || selected !== undefined

  useEffect(() => {
    if (!selectionAvailable) onValueChange('')
  }, [onValueChange, selectionAvailable])

  const pickerProps = {
    groups: [{ items: orderedInvestments }],
    name,
    value,
    label,
    placeholder: disabled ? disabledMessage : 'Select an investment',
    emptyMessage: 'No matching investments available.',
    getValue: (investment: Investment) => investment.id,
    getLabel: (investment: Investment) => {
      const data = investmentData(investment)
      return `${data.name}, ${data.symbol}`
    },
    renderItem: (investment: Investment) => (
      <InvestmentDetails investment={investment} />
    ),
    onValueChange,
    onBlur,
    invalid,
    disabled,
  }

  return isMobile ? (
    <MobileSelectionDrawer
      {...pickerProps}
      triggerClassName="h-12 min-h-12 px-2 py-1.5"
    />
  ) : (
    <DesktopSelectionPopover
      {...pickerProps}
      triggerClassName="h-12 min-h-12 justify-start p-2"
    />
  )
}

function InvestmentDetails({ investment }: { investment: Investment }) {
  const data = investmentData(investment)
  return (
    <>
      <Avatar size="sm">
        <AvatarImage
          src={
            data.type === 'crypto'
              ? getLogoCryptoURL(data.symbol)
              : getLogoTickerURL(data.symbol)
          }
          alt=""
        />
        <AvatarFallback>
          <ChartNoAxesCombinedIcon className="size-4" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
      <span className="flex min-w-0 flex-1 flex-col text-xs leading-4">
        <span className="truncate" title={data.name}>
          {data.name}
        </span>
        <span
          className="text-muted-foreground truncate"
          title={investment.accountName}
        >
          {data.symbol}
          {investment.accountName ? ` · ${investment.accountName}` : ''}
        </span>
      </span>
    </>
  )
}

function investmentData(investment: Investment) {
  return readInlineData<transactionInvestmentPickerFragment$key>(
    investmentFragment,
    investment,
  )
}
