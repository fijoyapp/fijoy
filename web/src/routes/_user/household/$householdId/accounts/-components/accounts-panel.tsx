import { graphql } from 'relay-runtime'
import invariant from 'tiny-invariant'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { useFragment } from 'react-relay'
import { capitalize, groupBy, map } from 'lodash-es'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'
import currency from 'currency.js'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { AccountCard } from './account-card'
import type { accountsPanelFragment$key } from './__generated__/accountsPanelFragment.graphql'
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
import { ACCOUNT_TYPE_LIST } from '@/constant'

const AccountsPanelFragment = graphql`
  fragment accountsPanelFragment on Query
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 20 }
    cursor: { type: "Cursor" }
  )
  @refetchable(queryName: "accountsPanelRefetch") {
    households {
      id
      currency {
        code
      }
    }
    accounts(first: $count, after: $cursor)
      @connection(key: "accountsPanel_accounts") {
      edges {
        node {
          id
          type
          valueInHouseholdCurrency
          ...accountCardFragment
        }
      }
    }
  }
`

type AccountsListPageProps = {
  fragmentRef: accountsPanelFragment$key
}

export function AccountsPanel({ fragmentRef }: AccountsListPageProps) {
  const data = useFragment(AccountsPanelFragment, fragmentRef)

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const groupedAccounts = useMemo(
    () => groupBy(data.accounts.edges, (edge) => edge?.node?.type),
    [data.accounts],
  )

  const { household } = useHousehold()

  const netWorth = useMemo(() => {
    return (data.accounts.edges ?? [])
      .map((edge) => {
        invariant(edge?.node, 'Account node is null')
        return currency(edge.node.valueInHouseholdCurrency)
      })
      .reduce((a, b) => a.add(b), currency(0))
  }, [data.accounts])

  return (
    <Fragment>
      <div className="flex">
        <Item variant="outline" className="">
          <ItemContent>
            <ItemDescription>Net Worth</ItemDescription>
            <ItemTitle className="text-2xl">
              {formatCurrencyWithPrivacyMode({
                value: netWorth,
                currencyCode: household.currency.code,
              })}
            </ItemTitle>
          </ItemContent>
        </Item>
        <div className="px-1"></div>
        <div className="flex flex-col items-stretch w-10">
          <Button
            size="icon-lg"
            className="flex-1 w-full cursor-pointer"
            render={
              <Link
                from="/household/$householdId/accounts"
                to="/household/$householdId/accounts/new"
              >
                <PlusIcon />
              </Link>
            }
          ></Button>
          <div className="py-1"></div>
          <Button
            size="icon-lg"
            variant="secondary"
            className="flex-1 w-full cursor-pointer"
          >
            <RefreshCwIcon />
          </Button>
        </div>
      </div>
      <div className="py-2"></div>
      <Accordion
        multiple
        className="w-full"
        defaultValue={[...ACCOUNT_TYPE_LIST]}
      >
        {map(ACCOUNT_TYPE_LIST, (type) => {
          if (type in groupedAccounts === false) {
            return null
          }
          const accounts = groupedAccounts[type]
          return (
            <AccordionItem value={type} key={type}>
              <AccordionTrigger className="justify-normal **:data-[slot=accordion-trigger-icon]:ml-0 gap-2 hover:no-underline cursor-pointer">
                <span>{capitalize(type)}</span>
                <span className="grow"></span>
                <span className="mr-3 font-mono">
                  {formatCurrencyWithPrivacyMode({
                    value: accounts
                      .map((account) => {
                        invariant(account?.node, 'Account node is null')
                        return currency(account.node.valueInHouseholdCurrency)
                      })
                      .reduce((a, b) => a.add(b), currency(0)),
                    currencyCode: 'CAD',
                    liability: type === 'liability',
                  })}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <ItemGroup className="gap-0">
                  {accounts.map((account) => {
                    invariant(account?.node, 'Account node is null')
                    return (
                      <Fragment key={account.node.id}>
                        <ItemSeparator className="my-1" />
                        <AccountCard fragmentRef={account.node} />
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
