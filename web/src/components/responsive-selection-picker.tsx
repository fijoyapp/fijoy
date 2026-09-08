import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { SelectionRows } from '@/components/selection-rows'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIsMobile } from '@/hooks/use-mobile'

type ResponsiveSelectionPickerProps<T> = {
  items: ReadonlyArray<T>
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
}

export function ResponsiveSelectionPicker<T>({
  items,
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
}: ResponsiveSelectionPickerProps<T>) {
  const isMobile = useIsMobile()
  const [editing, setEditing] = useState(false)
  const selected = items.find((item) => getValue(item) === value)
  const expanded = !selected || editing
  const summaryRef = useRef<HTMLButtonElement>(null)
  const wasExpanded = useRef(expanded)

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
          aria-label={`${label}: ${getLabel(selected)}`}
          onClick={() => setEditing(true)}
          className="border-input bg-background focus-visible:outline-ring flex min-h-9 w-full items-center gap-2 border px-2 py-1.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {renderItem(selected)}
          </span>
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
        <legend className="sr-only">{label}</legend>
        {items.length === 0 ? (
          <p className="text-muted-foreground w-full text-xs">{emptyMessage}</p>
        ) : (
          <SelectionRows label={label}>
            {items.map((item) => {
              const itemValue = getValue(item)
              return (
                <label
                  key={itemValue}
                  className="border-input bg-background has-checked:border-primary has-focus-visible:outline-ring flex min-h-9 max-w-64 min-w-0 cursor-pointer items-center gap-2 border px-2 py-1.5 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2"
                >
                  <input
                    type="radio"
                    name={name}
                    value={itemValue}
                    checked={value === itemValue}
                    onChange={() => {
                      onValueChange(itemValue)
                      setEditing(false)
                    }}
                    onClick={() => {
                      if (value === itemValue) setEditing(false)
                    }}
                    aria-invalid={invalid}
                    className="sr-only"
                  />
                  {renderItem(item)}
                </label>
              )
            })}
          </SelectionRows>
        )}
      </fieldset>
    )
  }

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) onBlur()
      }}
    >
      <DropdownMenuTrigger
        render={
          <Button
            id={name}
            name={name}
            type="button"
            variant="outline"
            aria-invalid={invalid}
            aria-label={`${label}: ${selected ? getLabel(selected) : placeholder}`}
            className="h-auto min-h-9 w-full justify-between px-2 py-1.5 text-left font-normal"
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-none overflow-hidden p-0">
        <ScrollArea className="max-h-80 [&_[data-slot=scroll-area-viewport]]:max-h-80">
          <div className="p-1">
            <DropdownMenuGroup>
              <DropdownMenuRadioGroup
                value={value}
                onValueChange={(nextValue) => {
                  if (typeof nextValue === 'string') onValueChange(nextValue)
                }}
              >
                {items.map((item) => {
                  const itemValue = getValue(item)
                  return (
                    <DropdownMenuRadioItem
                      key={itemValue}
                      value={itemValue}
                      aria-label={getLabel(item)}
                      closeOnClick
                      className="min-h-9"
                    >
                      {renderItem(item)}
                    </DropdownMenuRadioItem>
                  )
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
