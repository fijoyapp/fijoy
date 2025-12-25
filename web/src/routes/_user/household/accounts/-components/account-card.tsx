import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { BadgeCheckIcon, ChevronRightIcon } from 'lucide-react'
import { graphql } from 'relay-runtime'
import { accountCardFragment$key } from './__generated__/accountCardFragment.graphql'
import { useFragment } from 'react-relay'
import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { AccountBalanceDisplay } from './account-balance-display'

const accountCardFragment = graphql`
  fragment accountCardFragment on Account {
    id
    name
    type
    balance
    ...accountBalanceDisplayFragment_account
  }
`

type AccountCardProps = {
  fragmentRef: accountCardFragment$key
}

export function AccountCard({ fragmentRef }: AccountCardProps) {
  const data = useFragment(accountCardFragment, fragmentRef)

  return (
    <Item
      render={
        <Link
          className="no-underline!"
          to="/household/accounts/$accountId"
          activeOptions={{ exact: true }}
          params={{ accountId: data.id }}
        >
          {({ isActive }) => (
            <>
              <ItemMedia>
                <BadgeCheckIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className={cn(isActive && 'font-semibold')}>
                  {data.name}
                </ItemTitle>
              </ItemContent>
              <ItemContent className="">
                <ItemDescription className="font-mono">
                  <AccountBalanceDisplay fragmentRef={data} />
                </ItemDescription>
              </ItemContent>
              <ItemActions className="">
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </>
          )}
        </Link>
      }
    ></Item>
  )
}
