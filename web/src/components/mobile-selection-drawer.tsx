import { ChevronDownIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import {
  SearchableSelectionList,
  type SelectionGroup,
} from '@/components/searchable-selection-list'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

type MobileSelectionDrawerProps<T> = {
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
}

export function MobileSelectionDrawer<T>({
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
}: MobileSelectionDrawerProps<T>) {
  const [open, setOpen] = useState(false)
  const items = groups.flatMap((group) => group.items)
  const selected = items.find((item) => getValue(item) === value)

  return (
    <Drawer
      open={open}
      showSwipeHandle
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) onBlur()
      }}
    >
      <DrawerTrigger
        render={
          <button
            type="button"
            id={name}
            name={name}
            disabled={disabled}
            aria-invalid={invalid}
            aria-label={`${label}: ${selected ? getLabel(selected) : placeholder}`}
            className="border-input bg-input/20 focus-visible:outline-ring dark:bg-input/30 flex min-h-11 w-full items-center gap-2 border p-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        }
      >
        {selected ? (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {renderItem(selected)}
          </span>
        ) : (
          <span className="text-muted-foreground min-w-0 flex-1 truncate text-xs">
            {placeholder}
          </span>
        )}
        <ChevronDownIcon className="size-4 shrink-0" aria-hidden="true" />
      </DrawerTrigger>
      <DrawerContent className="h-[min(70svh,36rem)]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Select {label.toLowerCase()}</DrawerTitle>
          <DrawerDescription>
            Search or choose from the most recently used options first.
          </DrawerDescription>
        </DrawerHeader>
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
          fill
        />
      </DrawerContent>
    </Drawer>
  )
}
