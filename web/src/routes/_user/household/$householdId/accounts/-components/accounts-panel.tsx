import { graphql } from 'relay-runtime'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { useFragment } from 'react-relay'
import { capitalize, groupBy, map } from 'lodash-es'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'
import currency from 'currency.js'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { AccountCard } from './account-card'
import type {
  AccountType,
  accountsPanelFragment$key,
} from './__generated__/accountsPanelFragment.graphql'
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

const AccountsPanelFragment = graphql`
  fragment accountsPanelFragment on Query {
    accounts {
      id
      type
      balanceInHouseholdCurrency
      ...accountCardFragment
    }
  }
`

type AccountsListPageProps = {
  fragmentRef: accountsPanelFragment$key
}

const categoryOrder: Array<AccountType> = [
  'liquidity',
  'investment',
  'property',
  'receivable',
  'liability',
]

export function AccountsPanel({ fragmentRef }: AccountsListPageProps) {
  const data = useFragment(AccountsPanelFragment, fragmentRef)

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const groupedAccounts = useMemo(
    () => groupBy(data.accounts, (account) => account.type),
    [data.accounts],
  )

  const netWorth = useMemo(() => {
    return data.accounts
      .map((account) => currency(account.balanceInHouseholdCurrency))
      .reduce((a, b) => a.add(b), currency(0))
  }, [data.accounts])

  return (
    <Fragment>
      <Item variant="outline">
        <ItemContent>
          <ItemDescription>Net Worth</ItemDescription>
          <ItemTitle className="text-2xl">
            {/* TODO: DO NOT HARD CODE */}
            {formatCurrencyWithPrivacyMode(netWorth, 'CAD')}
          </ItemTitle>
        </ItemContent>
      </Item>
      <div className="py-2"></div>
      <Accordion
        multiple
        className="w-full"
        defaultValue={Object.keys(groupedAccounts)}
      >
        {map(categoryOrder, (type) => {
          const accounts = groupedAccounts[type]
          return (
            <AccordionItem value={type} key={type}>
              <AccordionTrigger className="justify-normal **:data-[slot=accordion-trigger-icon]:ml-0 gap-2 hover:no-underline cursor-pointer">
                <span>{capitalize(type)}</span>
                <span className="grow"></span>
                <span className="mr-3 font-mono">
                  {formatCurrencyWithPrivacyMode(
                    accounts
                      .map((account) =>
                        currency(account.balanceInHouseholdCurrency),
                      )
                      .reduce((a, b) => a.add(b), currency(0)),
                    'CAD',
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <ItemGroup className="gap-0">
                  {accounts.map((account) => {
                    return (
                      <Fragment key={account.id}>
                        <ItemSeparator className="my-1" />
                        <AccountCard fragmentRef={account} />
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
