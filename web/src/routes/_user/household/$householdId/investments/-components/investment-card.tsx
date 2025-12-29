import { BadgeCheckIcon, ChevronRightIcon, PiggyBankIcon } from 'lucide-react'
import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { Link } from '@tanstack/react-router'
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
import { getPrettyTime } from '@/lib/time'
import { type investmentCardFragment$key } from './__generated__/investmentCardFragment.graphql'

const investmentCardFragment = graphql`
  fragment investmentCardFragment on Investment {
    id
    name
    type
    updateTime
    currency {
      code
    }
    value
  }
`

type InvestmentCardProps = {
  fragmentRef: investmentCardFragment$key
}

export function InvestmentCard({ fragmentRef }: InvestmentCardProps) {
  const data = useFragment(investmentCardFragment, fragmentRef)

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  return (
    <Item
      render={
        <Link
          className="no-underline! "
          from="/household/$householdId/"
          to="/household/$householdId/investments/$investmentId"
          activeOptions={{ exact: true }}
          params={{ investmentId: data.id }}
        >
          {({ isActive }) => (
            <>
              <ItemMedia variant="image">
                <PiggyBankIcon className="size-6" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className={cn(isActive && 'font-semibold')}>
                  {data.name}
                </ItemTitle>
                {/* <ItemDescription>{data.user.name}</ItemDescription> */}
              </ItemContent>
              <ItemContent className="items-end">
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
    />
  )
}
