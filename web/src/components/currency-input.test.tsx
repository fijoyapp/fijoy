// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { CurrencyInput } from './currency-input'

afterEach(cleanup)

it('keeps the decimal mobile keyboard when negative values are allowed', () => {
  render(
    <CurrencyInput
      locale="en-US"
      currency="USD"
      allowNegative
      onValueChange={() => {}}
    />,
  )

  expect(screen.getByRole('textbox').getAttribute('inputmode')).toBe('decimal')
})

it('parses locale decimal separators before reporting the numeric value', () => {
  const onValueChange = vi.fn()
  render(
    <CurrencyInput
      locale="de-DE"
      currency="EUR"
      onValueChange={onValueChange}
    />,
  )

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: '12,34' },
  })

  expect(onValueChange).toHaveBeenLastCalledWith({
    floatValue: 12.34,
    value: '12,34',
  })
})
