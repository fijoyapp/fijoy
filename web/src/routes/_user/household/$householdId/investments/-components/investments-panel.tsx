import { graphql } from 'relay-runtime'
import invariant from 'tiny-invariant'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { useFragment } from 'react-relay'
import { groupBy, map } from 'lodash-es'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'
import currency from 'currency.js'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { InvestmentCard } from './investment-card'
import type { investmentsPanelFragment$key } from './__generated__/investmentsPanelFragment.graphql'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'
import { useDisplayCurrency } from '@/hooks/use-display-currency'
import { cn } from '@/lib/utils'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { PageAddButton } from '@/components/page-add-button'
import { NodeType, useRegisterConnection } from '@/lib/relay'

const GROUP_BY_OPTIONS = {
  account: 'By Account',
  symbol: 'By Symbol',
} as const

type GroupByOption = keyof typeof GROUP_BY_OPTIONS

const InvestmentsPanelFragment = graphql`
  fragment investmentsPanelFragment on Household
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 50 }
    cursor: { type: "Cursor" }
    viewUserIds: { type: "[ID!]" }
  )
  @refetchable(queryName: "investmentsPanelRefetch") {
    investments(
      first: $count
      after: $cursor
      where: { userIDIn: $viewUserIds }
    ) @connection(key: "investmentsPanel_investments") {
      __id
      edges {
        node {
          id
          name
          amount
          value
          account {
            name
            id
            householdCurrency {
              code
            }
          }
          ...investmentCardFragment
        }
      }
    }
  }
`

type InvestmentsPanelProps = {
  fragmentRef: investmentsPanelFragment$key
}

export function InvestmentsPanel({ fragmentRef }: InvestmentsPanelProps) {
  const data = useFragment(InvestmentsPanelFragment, fragmentRef)
  const { household: _household } = useHousehold()
  const { displayCurrencyCode, convert } = useDisplayCurrency()
  const navigate = useNavigate()
  const { householdId } = useParams({
    from: '/_user/household/$householdId',
  })
  const search = useSearch({
    from: '/_user/household/$householdId/investments',
  })
  const groupByOption = search.investments_group_by

  const handleGroupByChange = (newGroupBy: string | null) => {
    if (!newGroupBy) return
    navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        investments_group_by: newGroupBy as GroupByOption,
      }),
    })
  }

  useRegisterConnection(data.investments.__id, NodeType.Investment)

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const groupedInvestments = useMemo(
    () =>
      groupBy(
        data.investments.edges?.filter((i) => i?.node?.amount !== '0'),
        (investment) => {
          invariant(investment?.node, 'Investment node is null')
          if (groupByOption === 'symbol') {
            return investment.node.name
          }
          return investment.node.account.id
        },
      ),
    [data.investments, groupByOption],
  )

  const totalInvestment = useMemo(() => {
    return (data.investments.edges ?? [])
      .map((investment) => {
        invariant(investment?.node, 'Investment node is null')
        return convert(
          investment.node.value,
          investment.node.account.householdCurrency.code,
        )
      })
      .reduce((a, b) => a.add(b), currency(0))
  }, [data.investments, convert])

  return (
    <Fragment>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-[0.6875rem] font-medium tracking-wider uppercase">
            Total Investment
          </span>
          <div className="text-3xl font-semibold tracking-tight tabular-nums">
            {formatCurrencyWithPrivacyMode({
              value: totalInvestment,
              currencyCode: displayCurrencyCode,
            })}
          </div>
        </div>
        <PageAddButton
          label="Add investment"
          to="/household/$householdId/investments/new"
          params={{ householdId }}
        />
      </div>
      <div className="py-2"></div>

      {/* Group By Dropdown */}
      <div className="flex items-center justify-end">
        <Select
          name="group-investments"
          value={groupByOption}
          onValueChange={handleGroupByChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue>{GROUP_BY_OPTIONS[groupByOption]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {(
                Object.entries(GROUP_BY_OPTIONS) as [GroupByOption, string][]
              ).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="py-2"></div>

      <Accordion
        key={groupByOption}
        multiple
        className="w-full"
        defaultValue={Object.keys(groupedInvestments)}
      >
        {map(groupedInvestments, (investments, groupKey) => {
          invariant(investments[0]?.node, 'Investment node is null')
          const groupLabel =
            groupByOption === 'symbol'
              ? investments[0].node.name
              : investments[0].node.account.name
          const value = investments
            .map((investment) => {
              invariant(investment?.node, 'Investment node is null')
              return convert(
                investment.node.value,
                investment.node.account.householdCurrency.code,
              )
            })
            .reduce((a, b) => a.add(b), currency(0))

          const percentage = (value.value / totalInvestment.value) * 100

          const totalShares =
            groupByOption === 'symbol'
              ? investments.reduce(
                  (sum, inv) => {
                    invariant(inv?.node, 'Investment node is null')
                    return sum.add(currency(inv.node.amount, { precision: 8 }))
                  },
                  currency(0, { precision: 8 }),
                ).value
              : null

          return (
            <AccordionItem
              value={groupKey}
              key={groupKey}
              className="data-open:bg-transparent"
            >
              <AccordionTrigger className="bg-muted/60 flex cursor-pointer items-center justify-normal gap-2 hover:no-underline **:data-[slot=accordion-trigger-icon]:ml-0">
                <span>{groupLabel}</span>
                {totalShares !== null && totalShares > 0 && (
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {totalShares} shares
                  </span>
                )}
                <span className="grow"></span>
                <span className="text-muted-foreground tabular-nums">
                  {percentage.toFixed(2)}%
                </span>
                <span className="mr-3 text-sm font-semibold tracking-wide tabular-nums">
                  {formatCurrencyWithPrivacyMode({
                    value,
                    currencyCode: displayCurrencyCode,
                  })}
                </span>
              </AccordionTrigger>
              <AccordionContent className="-mx-2 pb-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {investments.map((investment) => {
                    invariant(investment?.node, 'Investment node is null')
                    return (
                      <InvestmentCard
                        key={investment.node.id}
                        fragmentRef={investment.node}
                        className="rounded-none"
                      />
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </Fragment>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          '**:data-[slot=accordion-trigger-icon]:text-muted-foreground group/accordion-trigger flex flex-1 items-start justify-between gap-6 border border-transparent p-2 text-left text-sm/relaxed font-semibold transition-all outline-none hover:underline disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4',
          className,
        )}
        {...props}
      >
        <ChevronDownIcon
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
