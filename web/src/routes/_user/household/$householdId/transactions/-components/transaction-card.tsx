import { graphql } from 'relay-runtime'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { transactionCardFragment$key } from './__generated__/transactionCardFragment.graphql'
import { useFragment } from 'react-relay'
import { useCurrency } from '@/hooks/use-currency'
import { BadgeCheckIcon } from 'lucide-react'

const transactionCardFragment = graphql`
  fragment transactionCardFragment on Transaction {
    id
    datetime
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
    <Item
      variant="outline"
      role="listitem"
      render={
        <a href="#">
          <ItemMedia variant="image">
            <BadgeCheckIcon className="size-5" />
          </ItemMedia>
          <ItemContent className="">
            <ItemTitle className="line-clamp-1">
              <span>CATEGORY</span>
            </ItemTitle>
            <ItemDescription>
              {new Date(data.datetime).toLocaleDateString()}
            </ItemDescription>
          </ItemContent>
          <ItemContent className="flex-none items-end">
            <ItemTitle className="line-clamp-1">
              <span className="">
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
        </a>
      }
    ></Item>
  )
}
