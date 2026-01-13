import currency from 'currency.js'
import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { useMemo } from 'react'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'
import type { financialSummaryCardsFragment$key } from './__generated__/financialSummaryCardsFragment.graphql'

const FinancialSummaryCardsFragment = graphql`
  fragment financialSummaryCardsFragment on FinancialReport {
    totalIncome
    totalExpenses
  }
`

interface FinancialSummaryCardsProps {
  fragmentRef: financialSummaryCardsFragment$key
}

export function FinancialSummaryCards({
  fragmentRef,
}: FinancialSummaryCardsProps) {
  const data = useFragment(FinancialSummaryCardsFragment, fragmentRef)
  const { household } = useHousehold()
  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const { totalIncome, totalExpenses, net, savingRate } = useMemo(() => {
    const income = currency(data.totalIncome)
    const expenses = currency(data.totalExpenses)
    const netAmount = income.subtract(expenses)

    return {
      totalIncome: income,
      totalExpenses: expenses,
      net: netAmount,
      savingRate:
        income.value === 0
          ? ':('
          : `${((netAmount.value / income.value) * 100).toFixed(2)}%`,
    }
  }, [data.totalIncome, data.totalExpenses])

  return (
    <div className="grid grid-cols-2 gap-4">
      <Item variant="outline" className="">
        <ItemContent>
          <ItemDescription>Total Income</ItemDescription>
          <ItemTitle className="text-xl">
            {formatCurrencyWithPrivacyMode({
              value: totalIncome,
              currencyCode: household.currency.code,
            })}
          </ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" className="">
        <ItemContent>
          <ItemDescription>Total Expenses</ItemDescription>
          <ItemTitle className="text-xl">
            {formatCurrencyWithPrivacyMode({
              value: totalExpenses,
              currencyCode: household.currency.code,
            })}
          </ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" className="">
        <ItemContent>
          <ItemDescription>Net</ItemDescription>
          <ItemTitle className="text-xl">
            {formatCurrencyWithPrivacyMode({
              value: net,
              currencyCode: household.currency.code,
            })}
          </ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" className="">
        <ItemContent>
          <ItemDescription>Saving Rate</ItemDescription>
          <ItemTitle className="text-xl">{savingRate}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  )
}
