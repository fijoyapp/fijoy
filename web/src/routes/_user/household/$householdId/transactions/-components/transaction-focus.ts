const FOCUSABLE_CONTROL_SELECTOR =
  'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [contenteditable="true"]'

export function focusInitialTransactionControl(container: HTMLElement) {
  const initialFocusRegion = container.querySelector<HTMLElement>(
    '[data-transaction-initial-focus]',
  )
  const form = container.querySelector<HTMLFormElement>('form')
  const firstControl =
    initialFocusRegion?.querySelector<HTMLElement>(
      FOCUSABLE_CONTROL_SELECTOR,
    ) ?? form?.querySelector<HTMLElement>(FOCUSABLE_CONTROL_SELECTOR)

  firstControl?.focus({ preventScroll: true })

  return firstControl ?? null
}
