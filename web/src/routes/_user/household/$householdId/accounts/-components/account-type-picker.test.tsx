// @vitest-environment jsdom
import { useState } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AccountTypePicker, type AccountType } from './account-type-picker'

afterEach(cleanup)

function Picker() {
  const [value, setValue] = useState<AccountType | ''>('')

  return (
    <>
      <span id="account-type-label">Type</span>
      <AccountTypePicker
        value={value}
        onValueChange={setValue}
        onBlur={vi.fn()}
        labelledBy="account-type-label"
      />
    </>
  )
}

describe('AccountTypePicker', () => {
  it('shows every available account type without opening a menu', () => {
    render(<Picker />)

    expect(screen.getByRole('group', { name: 'Type' })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Liquidity/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Investment/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Receivable/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Liability/ })).toBeTruthy()
    expect(screen.queryByRole('combobox')).toBeNull()
  })

  it('keeps one account type selected', () => {
    render(<Picker />)
    const investment = screen.getByRole('button', { name: /Investment/ })

    fireEvent.click(investment)
    expect(investment.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(investment)
    expect(investment.getAttribute('aria-pressed')).toBe('true')
  })
})
