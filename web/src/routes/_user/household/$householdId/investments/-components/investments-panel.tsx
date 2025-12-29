import { graphql } from 'relay-runtime'
import invariant from 'tiny-invariant'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { useFragment } from 'react-relay'
import { capitalize, groupBy, map, mapValues } from 'lodash-es'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'
import currency from 'currency.js'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { InvestmentCard } from './investment-card'
import type { investmentsPanelFragment$key } from './__generated__/investmentsPanelFragment.graphql'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'
import { useCurrency } from '@/hooks/use-currency'
import { cn } from '@/lib/utils'
import { useHousehold } from '@/hooks/use-household'

const InvestmentsPanelFragment = graphql`
  fragment investmentsPanelFragment on Query {
    households {
      id
      currency {
        code
      }
    }
    investments {
      id
      name
      value
      valueInHouseholdCurrency
      amount
      account {
        name
        id
      }
      ...investmentCardFragment
    }
  }
`

type InvestmentsPanelProps = {
  fragmentRef: investmentsPanelFragment$key
}

export function InvestmentsPanel({ fragmentRef }: InvestmentsPanelProps) {
  const data = useFragment(InvestmentsPanelFragment, fragmentRef)

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const groupedInvestments = useMemo(
    () => groupBy(data.investments, (investment) => investment.account.id),
    [data.investments],
  )

  const { householdId } = useHousehold()
  const household = data.households.find((h) => h.id === householdId)
  invariant(household, 'Household not found')

  const totalInvestment = useMemo(() => {
    return data.investments
      .map((investment) => currency(investment.valueInHouseholdCurrency))
      .reduce((a, b) => a.add(b), currency(0))
  }, [data.investments])

  return (
    <Fragment>
      <Item variant="outline">
        <ItemContent>
          <ItemDescription>Total Investment</ItemDescription>
          <ItemTitle className="text-2xl">
            {formatCurrencyWithPrivacyMode(
              totalInvestment,
              household.currency.code,
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
      <div className="py-2"></div>
      <Accordion
        multiple
        className="w-full"
        defaultValue={Object.keys(groupedInvestments)}
      >
        {map(groupedInvestments, (investments, _) => {
          const account = investments[0].account
          return (
            <AccordionItem value={account.id} key={account.id}>
              <AccordionTrigger className="justify-normal **:data-[slot=accordion-trigger-icon]:ml-0 gap-2 hover:no-underline cursor-pointer">
                <span>{capitalize(account.name)}</span>
                <span className="grow"></span>
                <span className="mr-3 font-mono">
                  {formatCurrencyWithPrivacyMode(
                    investments
                      .map((investment) =>
                        currency(investment.valueInHouseholdCurrency),
                      )
                      .reduce((a, b) => a.add(b), currency(0)),
                    'CAD',
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <ItemGroup className="gap-0">
                  {investments.map((investment) => {
                    return (
                      <Fragment key={investment.id}>
                        <ItemSeparator className="my-1" />
                        <InvestmentCard fragmentRef={investment} />
                      </Fragment>
                    )
                  })}
                </ItemGroup>
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
          '**:data-[slot=accordion-trigger-icon]:text-muted-foreground gap-6 p-2 text-left text-xs/relaxed font-medium hover:underline **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <HugeiconsIcon
          icon={ArrowUp01Icon}
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
