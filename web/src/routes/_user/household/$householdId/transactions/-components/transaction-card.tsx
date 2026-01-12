import { graphql } from 'relay-runtime'
import { match } from 'ts-pattern'
import { useFragment } from 'react-relay'
import {
  ArrowLeftRightIcon,
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  TrendingUpIcon,
  WrenchIcon,
} from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import currency from 'currency.js'
import type {
  TransactionCategoryType,
  transactionCardFragment$data,
  transactionCardFragment$key,
} from './__generated__/transactionCardFragment.graphql'
import { useCurrency } from '@/hooks/use-currency'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getLogoStockTickerURL } from '@/lib/logo'

const transactionCardFragment = graphql`
  fragment transactionCardFragment on Transaction {
    id
    datetime
    category {
      name
      type
    }
    lots {
      id
      amount
      price
      investment {
        name
        symbol
        currency {
          code
        }
      }
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

  return (
    <Fragment>
      {data.lots?.map((lot) => (
        <LotCard key={lot.id} data={data} lot={lot} />
      ))}
      {data.transactionEntries?.map((entry) => (
        <TransactionEntryCard
          key={entry.id}
          data={data}
          transactionEntry={entry}
        />
      ))}
    </Fragment>
  )
}

function TransactionEntryCard({
  data,
  transactionEntry,
}: {
  data: transactionCardFragment$data
  transactionEntry: NonNullable<
    transactionCardFragment$data['transactionEntries']
  >[number]
}) {
  const { formatCurrency } = useCurrency()

  return (
    <Item variant="outline" role="listitem">
      <ItemMedia variant="image" className="rounded-full">
        {getCategoryTypeIcon({ type: data.category.type })}
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
            {formatCurrency({
              value: transactionEntry.amount,
              currencyCode: transactionEntry.account.currency.code,
            })}
          </span>
        </ItemTitle>
        <ItemDescription>{transactionEntry.account.name}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

function LotCard({
  data,
  lot,
}: {
  data: transactionCardFragment$data
  lot: NonNullable<transactionCardFragment$data['lots']>[number]
}) {
  const { formatCurrency } = useCurrency()

  return (
    <Item variant="outline" role="listitem">
      <ItemMedia variant="image">
        <Avatar>
          <AvatarImage
            src={getLogoStockTickerURL(lot.investment.symbol || '')}
            alt={lot.investment.symbol || 'unknown logo'}
          />
          <AvatarFallback>{lot.investment.symbol}</AvatarFallback>
        </Avatar>
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
            {formatCurrency({
              value: currency(lot.price).multiply(currency(lot.amount)),
              currencyCode: lot.investment.currency.code,
            })}
          </span>
        </ItemTitle>
        <ItemDescription>
          {lot.amount} {lot.investment.name} @{' '}
          {formatCurrency({
            value: currency(lot.price),
            currencyCode: lot.investment.currency.code,
          })}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}

function getCategoryTypeIcon({ type }: { type: TransactionCategoryType }) {
  return match(type)
    .with('income', () => (
      <BanknoteArrowUpIcon className="size-10 text-white bg-green-500/90 p-1.5" />
    ))
    .with('expense', () => (
      <BanknoteArrowDownIcon className="size-10 text-white bg-red-500/90 p-1.5" />
    ))
    .with('transfer', () => (
      <ArrowLeftRightIcon className="size-10 text-white bg-orange-500/90 p-1.5" />
    ))
    .with('setup', () => (
      <WrenchIcon className="size-10 text-white bg-orange-500/90 p-1.5" />
    ))
    .with('investment', () => (
      <TrendingUpIcon className="size-10 text-white bg-blue-500/90 p-1.5" />
    ))
    .otherwise(() => null)
}
