import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { capitalize, groupBy, map } from 'lodash-es'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { AccountCard } from './account-card'
import type { accountsListPageFragment$key } from './__generated__/accountsListPageFragment.graphql'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'
import currency from 'currency.js'

const AccountsListPageFragment = graphql`
  fragment accountsListPageFragment on Query {
    accounts {
      id
      type
      balanceInHouseholdCurrency
      ...accountCardFragment
    }
  }
`

type AccountsListPageProps = {
  fragmentRef: accountsListPageFragment$key
}

export function AccountsListPage({ fragmentRef }: AccountsListPageProps) {
  const data = useFragment(AccountsListPageFragment, fragmentRef)

  const groupedAccounts = useMemo(
    () => groupBy(data.accounts, (account) => account.type),
    [data.accounts],
  )

  const netWorth = useMemo(() => {
    return data.accounts
      .map((account) => currency(account.balanceInHouseholdCurrency))
      .reduce((a, b) => a.add(b), currency(0))
  }, [data.accounts])

  const value = Intl.NumberFormat('en-CA', {
    currency: 'CAD',
    style: 'currency',
  }).format(netWorth.value)

  return (
    <Fragment>
      <Item
        variant="outline"
        render={
          <>
            <ItemContent>
              <ItemDescription>Net Worth</ItemDescription>
              <ItemTitle className="text-2xl">{value}</ItemTitle>
            </ItemContent>
          </>
        }
      />
      <div className="py-2"></div>
      <Accordion
        multiple
        className="w-full"
        defaultValue={Object.keys(groupedAccounts)}
      >
        {map(groupedAccounts, (accounts, type) => {
          return (
            <AccordionItem value={type} key={type}>
              <AccordionTrigger>{capitalize(type)}</AccordionTrigger>
              <AccordionContent>
                <ItemGroup className="gap-0">
                  {accounts.map((account, index) => {
                    return (
                      <Fragment key={account.id}>
                        <AccountCard fragmentRef={account} />
                        {index !== accounts.length - 1 && <ItemSeparator />}
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
