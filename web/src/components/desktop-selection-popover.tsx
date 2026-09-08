import { ChevronDownIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import {
  SearchableSelectionList,
  type SelectionGroup,
} from '@/components/searchable-selection-list'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DesktopSelectionPopoverProps<T> = {
  groups: ReadonlyArray<SelectionGroup<T>>
  name: string
  value: string
  label: string
  placeholder: string
  emptyMessage: string
  getValue: (item: T) => string
  getLabel: (item: T) => string
  renderItem: (item: T) => ReactNode
  onValueChange: (value: string) => void
  onBlur: () => void
  invalid: boolean
  disabled?: boolean
  triggerClassName?: string
}

export function DesktopSelectionPopover<T>({
  groups,
  name,
  value,
  label,
  placeholder,
  emptyMessage,
  getValue,
  getLabel,
  renderItem,
  onValueChange,
  onBlur,
  invalid,
  disabled = false,
  triggerClassName,
}: DesktopSelectionPopoverProps<T>) {
  const [open, setOpen] = useState(false)
  const items = groups.flatMap((group) => group.items)
  const selected = items.find((item) => getValue(item) === value)

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) onBlur()
      }}
    >
      <PopoverTrigger
        render={
          <Button
            id={name}
            name={name}
            type="button"
            variant="outline"
            disabled={disabled}
            aria-invalid={invalid}
            aria-label={`${label}: ${selected ? getLabel(selected) : placeholder}`}
            className={cn(
              'bg-input/20 dark:bg-input/30 h-auto min-h-9 w-full justify-between gap-2 px-2 py-1.5 text-left font-normal',
              triggerClassName,
            )}
          />
        }
      >
        {selected ? (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {renderItem(selected)}
          </span>
        ) : (
          <span className="text-muted-foreground min-w-0 flex-1 truncate text-left">
            {placeholder}
          </span>
        )}
        <ChevronDownIcon data-icon="inline-end" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-(--anchor-width) min-w-72 gap-0 overflow-hidden p-0"
      >
        <SearchableSelectionList
          groups={groups}
          value={value}
          label={label}
          emptyMessage={emptyMessage}
          getValue={getValue}
          getLabel={getLabel}
          renderItem={renderItem}
          onValueChange={(nextValue) => {
            onValueChange(nextValue)
            setOpen(false)
            onBlur()
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
