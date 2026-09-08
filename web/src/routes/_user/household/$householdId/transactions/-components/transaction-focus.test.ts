// @vitest-environment jsdom

import { afterEach, expect, it } from 'vitest'

import { focusInitialTransactionControl } from './transaction-focus'

afterEach(() => {
  document.body.replaceChildren()
})

it('focuses the first control in the marked transaction field', () => {
  const container = document.createElement('div')
  container.innerHTML = `
    <form>
      <div data-transaction-initial-focus>
        <input name="categoryId" />
      </div>
      <input name="amount" />
    </form>
  `
  document.body.append(container)

  const focusedControl = focusInitialTransactionControl(container)

  expect(focusedControl).toBe(
    container.querySelector<HTMLInputElement>('[name="categoryId"]'),
  )
  expect(document.activeElement).toBe(focusedControl)
})

it('falls back to the first enabled form control', () => {
  const container = document.createElement('div')
  container.innerHTML = `
    <form>
      <input type="hidden" name="ignored" />
      <input name="description" />
      <input name="amount" />
    </form>
  `
  document.body.append(container)

  const focusedControl = focusInitialTransactionControl(container)

  expect(focusedControl).toBe(
    container.querySelector<HTMLInputElement>('[name="description"]'),
  )
  expect(document.activeElement).toBe(focusedControl)
})
