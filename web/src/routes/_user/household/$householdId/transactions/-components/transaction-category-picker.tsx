import { CategoryIcon } from '@/components/category-icon'
import { SelectionRows } from './selection-rows'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { useIsMobile } from '@/hooks/use-mobile'
import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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
  const isMobile = useIsMobile()
  const [editing, setEditing] = useState(false)
  const expanded = !value || editing
  const summaryRef = useRef<HTMLButtonElement>(null)
  const wasExpanded = useRef(expanded)
  const selected = categories.find((category) => category.id === value)

  useEffect(() => {
    if (isMobile && wasExpanded.current && !expanded) {
      summaryRef.current?.focus({ preventScroll: true })
    }
    wasExpanded.current = expanded
  }, [expanded, isMobile])

  if (isMobile) {
    if (!expanded && selected) {
      return (
        <button
          ref={summaryRef}
          type="button"
          id={name}
          aria-expanded={false}
          aria-label={`Category: ${selected.name}`}
          onClick={() => setEditing(true)}
          className="border-input bg-background focus-visible:outline-ring flex min-h-9 w-full items-center gap-2 border px-2 py-1.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <CategoryDetails category={selected} />
          <ChevronDownIcon className="size-4 shrink-0" aria-hidden="true" />
        </button>
      )
    }

    return (
      <fieldset
        id={name}
        aria-invalid={invalid}
        className="m-0 min-w-0 border-0 p-0"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) onBlur()
        }}
      >
        <legend className="sr-only">Category</legend>
        {categories.length === 0 ? (
          <p className="text-muted-foreground w-full text-xs">
            No categories available.
          </p>
        ) : (
          <SelectionRows label="Categories">
            {categories.map((category) => (
              <label
                key={category.id}
                className="border-input bg-background has-checked:border-primary has-focus-visible:outline-ring flex min-h-9 max-w-64 min-w-0 cursor-pointer items-center gap-2 border px-2 py-1.5 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2"
              >
                <input
                  type="radio"
                  name={name}
                  value={category.id}
                  checked={value === category.id}
                  onChange={() => {
                    onValueChange(category.id)
                    setEditing(false)
                  }}
                  onClick={() => {
                    if (value === category.id) setEditing(false)
                  }}
                  aria-invalid={invalid}
                  className="sr-only"
                />
                <CategoryDetails category={category} />
              </label>
            ))}
          </SelectionRows>
        )}
      </fieldset>
    )
  }

  return (
    <Combobox
      items={categories.map((category) => category.id)}
      itemToStringLabel={(item) =>
        categories.find((category) => category.id === item)?.name || ''
      }
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue || '')}
    >
      <ComboboxInput
        data-1p-ignore
        id={name}
        name={name}
        placeholder="Select a category"
        onBlur={onBlur}
        aria-invalid={invalid}
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {categories.find((category) => category.id === item)?.name || ''}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
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
