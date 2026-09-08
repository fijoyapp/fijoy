import type { ReactNode } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

export type SelectionGroup<T> = {
  label?: string
  items: ReadonlyArray<T>
}

type SearchableSelectionListProps<T> = {
  groups: ReadonlyArray<SelectionGroup<T>>
  value: string
  label: string
  emptyMessage: string
  getValue: (item: T) => string
  getLabel: (item: T) => string
  renderItem: (item: T) => ReactNode
  onValueChange: (value: string) => void
  fill?: boolean
}

export function SearchableSelectionList<T>({
  groups,
  value,
  label,
  emptyMessage,
  getValue,
  getLabel,
  renderItem,
  onValueChange,
  fill = false,
}: SearchableSelectionListProps<T>) {
  return (
    <Command
      label={`Search ${label.toLowerCase()}`}
      className={cn('h-auto rounded-none p-0', fill && 'min-h-0 flex-1')}
    >
      <CommandInput
        autoFocus
        aria-label={`Search ${label.toLowerCase()}`}
        placeholder={`Search ${label.toLowerCase()}...`}
      />
      <CommandList
        className={cn('pb-1', fill ? 'max-h-none min-h-0 flex-1' : 'max-h-72')}
      >
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        {groups.map((group, groupIndex) => (
          <CommandGroup key={group.label ?? groupIndex} heading={group.label}>
            {group.items.map((item) => {
              const itemValue = getValue(item)
              return (
                <CommandItem
                  key={itemValue}
                  value={`${getLabel(item)} ${itemValue}`}
                  data-checked={value === itemValue}
                  onSelect={() => onValueChange(itemValue)}
                  className="min-h-10"
                >
                  {renderItem(item)}
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )
}
