// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { CategoryIcon } from './category-icon'

const { loadIcon } = vi.hoisted(() => ({
  loadIcon: vi.fn(async () => ({
    __iconNode: [['path', { d: 'M0 0L1 1', key: 'test' }]],
  })),
}))
vi.mock('lucide-react/dynamic', () => ({
  dynamicIconImports: { wallet: loadIcon },
}))

it('reserves icon space and immediately renders a cached icon on remount', async () => {
  const first = render(
    <CategoryIcon name="wallet" fallback={<span>Loading icon</span>} />,
  )
  expect(screen.getByText('Loading icon').parentElement?.className).toContain(
    'size-4 shrink-0',
  )
  await act(async () => {
    await Promise.resolve()
  })
  expect(first.container.querySelector('svg')).not.toBeNull()
  first.unmount()
  const second = render(
    <CategoryIcon name="wallet" fallback={<span>Loading icon</span>} />,
  )
  expect(second.container.querySelector('svg')).not.toBeNull()
  expect(screen.queryByText('Loading icon')).toBeNull()
  expect(loadIcon).toHaveBeenCalledTimes(1)
  second.unmount()
})
