import { commitLocalUpdate, graphql } from 'relay-runtime'
import invariant from 'tiny-invariant'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { useFragment, useMutation, useRelayEnvironment } from 'react-relay'
import { groupBy, map } from 'lodash-es'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'
import currency from 'currency.js'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { toast } from 'sonner'
import { match } from 'ts-pattern'
import { InvestmentCard } from './investment-card'
import type { investmentsPanelFragment$key } from './__generated__/investmentsPanelFragment.graphql'
import type { investmentsPanelRefreshMutation } from './__generated__/investmentsPanelRefreshMutation.graphql'
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
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'

const InvestmentsPanelFragment = graphql`
  fragment investmentsPanelFragment on Query
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 50 }
    cursor: { type: "Cursor" }
  )
  @refetchable(queryName: "investmentsPanelRefetch") {
    investments(first: $count, after: $cursor)
      @connection(key: "investmentsPanel_investments") {
      edges {
        node {
          id
          name
          valueInHouseholdCurrency
          account {
            name
            id
          }
          ...investmentCardFragment
        }
      }
    }
  }
`

const InvestmentsPanelRefreshMutation = graphql`
  mutation investmentsPanelRefreshMutation {
    refresh
  }
`

type InvestmentsPanelProps = {
  fragmentRef: investmentsPanelFragment$key
}

export function InvestmentsPanel({ fragmentRef }: InvestmentsPanelProps) {
  const data = useFragment(InvestmentsPanelFragment, fragmentRef)
  const environment = useRelayEnvironment()

  const [commitRefreshMutation, isRefreshInFlight] =
    useMutation<investmentsPanelRefreshMutation>(
      InvestmentsPanelRefreshMutation,
    )

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const handleRefresh = () => {
    commitRefreshMutation({
      variables: {},
      onCompleted: (data, errors) => {
        const result = { status: 'success' as const, data, errors }
        match(result)
          .with({ status: 'success', errors: null }, () => {
            // Invalidate the Relay store to refetch all queries
            commitLocalUpdate(environment, (store) => {
              store.invalidateStore()
            })
            toast.success('Investments refreshed successfully!')
          })
          .with({ status: 'success' }, ({ errors }) => {
            toast.error(
              `Refresh failed: ${errors?.[0]?.message ?? 'Unknown error'}`,
            )
          })
          .exhaustive()
      },
      onError: (error) => {
        toast.error(`Refresh failed: ${error.message}`)
      },
    })
  }

  const groupedInvestments = useMemo(
    () =>
      groupBy(data.investments.edges, (investment) => {
        invariant(investment?.node, 'Investment node is null')
        return investment.node.account.id
      }),
    [data.investments],
  )

  const { household } = useHousehold()

  const totalInvestment = useMemo(() => {
    return (data.investments.edges ?? [])
      .map((investment) => {
        invariant(investment?.node, 'Investment node is null')
        return currency(investment.node.valueInHouseholdCurrency)
      })
      .reduce((a, b) => a.add(b), currency(0))
  }, [data.investments])

  return (
    <Fragment>
      <div className="fixed right-4 bottom-4 flex flex-col gap-2 lg:absolute">
        <Button
          variant="outline"
          nativeButton={true}
          size="icon-xl"
          className="bg-background dark:bg-card rounded-full"
          onClick={handleRefresh}
          disabled={isRefreshInFlight}
        >
          <RefreshCwIcon className={isRefreshInFlight ? 'animate-spin' : ''} />
        </Button>
        <Link
          from={'/household/$householdId/investments'}
          to={'/household/$householdId/investments/new'}
          search={(prev) => ({ ...prev })}
        >
          <Button nativeButton={true} className="rounded-full" size="icon-xl">
            <PlusIcon />
          </Button>
        </Link>
      </div>
      <Item variant="outline" className="">
        <ItemContent>
          <ItemDescription>Total Investment</ItemDescription>
          <ItemTitle className="text-2xl">
            {formatCurrencyWithPrivacyMode({
              value: totalInvestment,
              currencyCode: household.currency.code,
            })}
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
          invariant(investments[0]?.node, 'Investment node is null')
          const account = investments[0].node.account

          return (
            <AccordionItem value={account.id} key={account.id}>
              <AccordionTrigger className="cursor-pointer justify-normal gap-2 hover:no-underline **:data-[slot=accordion-trigger-icon]:ml-0">
                <span>{account.name}</span>
                <span className="grow"></span>
                <span className="mr-3 font-mono">
                  {formatCurrencyWithPrivacyMode({
                    value: investments
                      .map((investment) => {
                        invariant(investment?.node, 'Investment node is null')
                        return currency(
                          investment.node.valueInHouseholdCurrency,
                        )
                      })
                      .reduce((a, b) => a.add(b), currency(0)),
                    currencyCode: household.currency.code,
                  })}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <ItemGroup className="gap-0">
                  {investments.map((investment) => {
                    invariant(investment?.node, 'Investment node is null')
                    return (
                      <Fragment key={investment.node.id}>
                        <ItemSeparator className="my-1" />
                        <InvestmentCard fragmentRef={investment.node} />
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
          '**:data-[slot=accordion-trigger-icon]:text-muted-foreground group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 border border-transparent p-2 text-left text-xs/relaxed font-medium transition-all outline-none hover:underline disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4',
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
