import { CategoryIcon } from '@/components/category-icon'
import { ResponsiveSelectionPicker } from '@/components/responsive-selection-picker'

type TransactionCategoryPickerProps = {
  categories: ReadonlyArray<{
    id: string
    name: string
    icon?: string | null
    type: string
  }>
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
  return (
    <ResponsiveSelectionPicker
      items={categories}
      name={name}
      value={value}
      label="Category"
      placeholder="Select a category"
      emptyMessage="No categories available."
      getValue={(category) => category.id}
      getLabel={(category) => category.name}
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
  return (
    <>
      <CategoryIcon type={category.type} icon={category.icon} size="inline" />
      <span
        className="min-w-0 flex-1 truncate text-xs leading-relaxed"
        title={category.name}
      >
        {category.name}
      </span>
    </>
  )
}
