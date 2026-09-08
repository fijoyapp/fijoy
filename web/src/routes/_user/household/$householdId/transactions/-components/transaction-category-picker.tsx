import { CategoryIcon } from '@/components/category-icon'
import { ResponsiveSelectionPicker } from '@/components/responsive-selection-picker'
import { graphql } from 'react-relay'
import { readInlineData } from 'relay-runtime'
import type { transactionCategoryPickerFragment$key } from './__generated__/transactionCategoryPickerFragment.graphql'
import { newestActivityFirst } from '@/lib/sort-by-update-time'

const categoryFragment = graphql`
  fragment transactionCategoryPickerFragment on TransactionCategory @inline {
    name
    icon
    latestTransaction {
      datetime
    }
  }
`

type TransactionCategoryPickerProps = {
  categories: ReadonlyArray<
    transactionCategoryPickerFragment$key & {
      id: string
      type: string
    }
  >
  name: string
  value: string
  onValueChange: (value: string) => void
  onBlur: () => void
  invalid: boolean
}

export function TransactionCategoryPicker({
  categories,
  name,
  value,
  onValueChange,
  onBlur,
  invalid,
}: TransactionCategoryPickerProps) {
  const orderedCategories = newestActivityFirst(
    categories.map((category) => {
      const latestTransaction = categoryData(category).latestTransaction
      return {
        category,
        latestTransaction: latestTransaction
          ? { datetime: latestTransaction.datetime }
          : latestTransaction,
      }
    }),
  ).map(({ category }) => category)

  return (
    <ResponsiveSelectionPicker
      items={orderedCategories}
      name={name}
      value={value}
      label="Category"
      placeholder="Select a category"
      emptyMessage="No categories available."
      getValue={(category) => category.id}
      getLabel={(category) => categoryData(category).name}
      renderItem={(category) => <CategoryDetails category={category} />}
      onValueChange={onValueChange}
      onBlur={onBlur}
      invalid={invalid}
    />
  )
}

function CategoryDetails({
  category,
}: {
  category: TransactionCategoryPickerProps['categories'][number]
}) {
  const data = categoryData(category)
  return (
    <>
      <CategoryIcon type={category.type} icon={data.icon} size="inline" />
      <span
        className="min-w-0 flex-1 truncate text-xs leading-relaxed"
        title={data.name}
      >
        {data.name}
      </span>
    </>
  )
}

function categoryData(
  category: TransactionCategoryPickerProps['categories'][number],
) {
  return readInlineData<transactionCategoryPickerFragment$key>(
    categoryFragment,
    category,
  )
}
