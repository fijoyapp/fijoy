import { BadgeCheckIcon, ChevronRightIcon } from 'lucide-react'
import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { Link } from '@tanstack/react-router'
import type { accountCardFragment$key } from './__generated__/accountCardFragment.graphql'
import { cn } from '@/lib/utils'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { useCurrency } from '@/hooks/use-currency'
import { getFormattedDate, getPrettyTime } from '@/lib/time'

const accountCardFragment = graphql`
  fragment accountCardFragment on Account {
    id
    name
    type
    updateTime
    currency {
      code
    }
    balance
    ...accountBalanceDisplayFragment_account
  }
`

type AccountCardProps = {
  fragmentRef: accountCardFragment$key
}

export function AccountCard({ fragmentRef }: AccountCardProps) {
  const data = useFragment(accountCardFragment, fragmentRef)

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  return (
    <Item
      render={
        <Link
          className="no-underline!"
          from="/household/$householdId/"
          to="/household/$householdId/accounts/$accountId"
          activeOptions={{ exact: true }}
          params={{ accountId: data.id }}
        >
          {({ isActive }) => (
            <>
              {/* <ItemMedia> */}
              {/*   <BadgeCheckIcon className="size-5" /> */}
              {/* </ItemMedia> */}
              <ItemContent>
                <ItemTitle className={cn(isActive && 'font-semibold')}>
                  {data.name}
                </ItemTitle>
                <ItemDescription>{}</ItemDescription>
              </ItemContent>
              <ItemContent className="items-end">
                <ItemTitle className="font-mono">
                  <span>
                    {formatCurrencyWithPrivacyMode(
                      data.balance,
                      data.currency.code,
                    )}
                  </span>
                </ItemTitle>
                <ItemDescription className="">
                  <span>{getPrettyTime(new Date(data.updateTime))}</span>
                </ItemDescription>
              </ItemContent>
            </>
          )}
        </Link>
      }
    ></Item>
  )
}
