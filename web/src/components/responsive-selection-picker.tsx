import type { ReactNode } from 'react'

import { DesktopSelectionPopover } from '@/components/desktop-selection-popover'
import { MobileSelectionDrawer } from '@/components/mobile-selection-drawer'
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

  if (isMobile) {
    return (
      <MobileSelectionDrawer
        groups={[{ items }]}
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
        getValue={getValue}
        getLabel={getLabel}
        renderItem={renderItem}
        onValueChange={onValueChange}
        onBlur={onBlur}
        invalid={invalid}
      />
    )
  }

  return (
    <DesktopSelectionPopover
      groups={[{ items }]}
      name={name}
      value={value}
      label={label}
      placeholder={placeholder}
      emptyMessage={emptyMessage}
      getValue={getValue}
      getLabel={getLabel}
      renderItem={renderItem}
      onValueChange={onValueChange}
      onBlur={onBlur}
      invalid={invalid}
    />
  )
}
