import { BadgeCheckIcon, ChevronRightIcon, PiggyBankIcon } from 'lucide-react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getLogoDomainURL } from '@/lib/logo'

const accountCardFragment = graphql`
  fragment accountCardFragment on Account {
    id
    name
    type
    iconPath
    updateTime
    currency {
      code
    }
    user {
      name
    }
    value
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
          className="no-underline! "
          from="/household/$householdId/"
          to="/household/$householdId/accounts/$accountId"
          activeOptions={{ exact: true }}
          params={{ accountId: data.id }}
        >
          {({ isActive }) => (
            <>
              <ItemMedia variant="image">
                <Avatar className="">
                  <AvatarImage
                    src={getLogoDomainURL(data.iconPath || '')}
                    alt={data.iconPath || 'unknown logo'}
                  />
                  <AvatarFallback>{data.name}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-px">
                <ItemTitle className={cn(isActive && 'font-semibold')}>
                  {data.name}
                </ItemTitle>
                <ItemDescription>{data.user.name}</ItemDescription>
              </ItemContent>
              <ItemContent className="items-end gap-px">
                <ItemTitle className="font-mono">
                  <span>
                    {formatCurrencyWithPrivacyMode(
                      data.value,
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
