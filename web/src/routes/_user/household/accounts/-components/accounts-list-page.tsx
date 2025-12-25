import { graphql } from 'relay-runtime'
import { accountsListPageFragment$key } from './__generated__/accountsListPageFragment.graphql'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useFragment } from 'react-relay'
import { capitalize, groupBy, map } from 'lodash-es'
import { AccountCard } from './account-card'
import { ItemGroup, ItemSeparator } from '@/components/ui/item'

const AccountsListPageFragment = graphql`
  fragment accountsListPageFragment on Query {
    accounts {
      id
      type
      ...accountCardFragment
    }
  }
`

type AccountsListPageProps = {
  fragmentRef: accountsListPageFragment$key
}

export function AccountsListPage({ fragmentRef }: AccountsListPageProps) {
  const data = useFragment(AccountsListPageFragment, fragmentRef)

  const groupedAccounts = groupBy(data.accounts, (account) => account.type)

  return (
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
                    <>
                      <AccountCard key={account.id} fragmentRef={account} />
                      {index !== accounts.length - 1 && <ItemSeparator />}
                    </>
                  )
                })}
              </ItemGroup>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
