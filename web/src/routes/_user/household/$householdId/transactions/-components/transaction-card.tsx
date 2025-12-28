import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { BadgeCheckIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { transactionCardFragment$key } from './__generated__/transactionCardFragment.graphql'
import { useCurrency } from '@/hooks/use-currency'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

const transactionCardFragment = graphql`
  fragment transactionCardFragment on Transaction {
    id
    datetime
    category {
      name
      type
    }
    transactionEntries {
      id
      amount
      account {
        name
        currency {
          code
        }
      }
    }
  }
`

type TransactionCardProps = {
  fragmentRef: transactionCardFragment$key
}

export function TransactionCard({ fragmentRef }: TransactionCardProps) {
  const data = useFragment(transactionCardFragment, fragmentRef)

  const { formatCurrency } = useCurrency()

  return (
    <Item variant="outline" role="listitem">
      <ItemMedia variant="image">
        <BadgeCheckIcon className="size-5" />
      </ItemMedia>
      <ItemContent className="">
        <ItemTitle className="line-clamp-1">
          <span>{data.category.name}</span>
        </ItemTitle>
        <ItemDescription>
          {new Date(data.datetime).toLocaleDateString()}
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex-none items-end">
        <ItemTitle className="line-clamp-1">
          <span className="">
            {/* TODO: properly handle transaction entries */}
            {formatCurrency(
              data.transactionEntries![0].amount,
              data.transactionEntries![0].account.currency.code,
            )}
          </span>
        </ItemTitle>
        <ItemDescription>
          {data.transactionEntries![0].account.name}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
