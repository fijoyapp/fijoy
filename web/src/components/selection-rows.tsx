import {
  Children,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

/** Balance all cards into viewport-width rows without remounting on selection. */
export function SelectionRows({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const cards = Children.toArray(children)
  const itemKeys = JSON.stringify(
    cards.map((card, index) => (isValidElement(card) ? card.key : index)),
  )

  useLayoutEffect(() => {
    const root = rootRef.current
    const items = itemsRef.current
    if (!root || !items) return
    const elements = Array.from(
      items.querySelectorAll<HTMLElement>('[data-selection-index]'),
    )
    let previousWidth = 0
    let previousSizes = ''
    const measure = () => {
      const width = root.clientWidth
      if (!width) return
      if (width !== previousWidth)
        root.style.setProperty('--selection-width', `${width}px`)
      const sizes = elements.map((element, index) => {
        const bounds = element.getBoundingClientRect()
        return { index, width: bounds.width, height: bounds.height }
      })
      const signature = JSON.stringify(sizes)
      if (width === previousWidth && signature === previousSizes) return
      previousWidth = width
      previousSizes = signature
      const gap = 8
      let rowCount = 1
      let usedWidth = 0
      for (const card of sizes) {
        const nextWidth = usedWidth ? usedWidth + gap + card.width : card.width
        if (usedWidth && nextWidth > width) {
          rowCount++
          usedWidth = card.width
        } else usedWidth = nextWidth
      }
      const rowWidths = Array<number>(rowCount).fill(0)
      const rowHeights = Array<number>(rowCount).fill(0)
      const placement = Array<number>(sizes.length).fill(0)
      for (const card of [...sizes].sort(
        (a, b) => b.width - a.width || a.index - b.index,
      )) {
        const row = rowWidths.indexOf(Math.min(...rowWidths))
        placement[card.index] = row
        rowWidths[row] += card.width + (rowWidths[row] ? gap : 0)
        rowHeights[row] = Math.max(rowHeights[row], card.height)
      }
      const offsets = Array<number>(rowCount).fill(0)
      for (const card of sizes) {
        const row = placement[card.index]
        const top = rowHeights
          .slice(0, row)
          .reduce((sum, height) => sum + height + gap, 0)
        const element = elements[card.index]
        element.style.position = 'absolute'
        element.style.left = `${offsets[row]}px`
        element.style.top = `${top}px`
        offsets[row] += card.width + gap
      }
      items.style.width = `${Math.max(0, ...rowWidths)}px`
      items.style.height = `${rowHeights.reduce((sum, height) => sum + height, 0) + gap * (rowCount - 1)}px`
    }
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    elements.forEach((element) => observer.observe(element))
    measure()
    return () => observer.disconnect()
  }, [itemKeys])

  return (
    <div ref={rootRef} className="w-full min-w-0">
      <ScrollArea className="w-full min-w-0 overflow-hidden [&_[data-slot=scroll-area-scrollbar]]:hidden">
        <div
          ref={itemsRef}
          role="group"
          aria-label={label}
          className="relative flex w-max gap-2"
        >
          {cards.map((card, index) => (
            <div
              key={isValidElement(card) ? card.key : index}
              data-selection-index={index}
              className="flex w-max max-w-[var(--selection-width)] shrink-0 [&>label]:max-w-full"
            >
              {card}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
