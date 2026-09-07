import {
  Children,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

/** Use the available width before growing to at most three scrollable rows. */
export function SelectionRows({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const [rows, setRows] = useState(1)
  const [placement, setPlacement] = useState<number[]>([])
  const cards = Children.toArray(children)

  useLayoutEffect(() => {
    const root = rootRef.current
    const items = itemsRef.current
    if (!root || !items) return
    const measure = () => {
      const width = root.clientWidth
      if (!width) return
      root.style.setProperty('--selection-width', `${width}px`)
      const cards = Array.from(
        items.querySelectorAll<HTMLElement>('[data-selection-index]'),
      ).sort(
        (a, b) =>
          Number(a.dataset.selectionIndex) - Number(b.dataset.selectionIndex),
      )
      const gap = 8
      let nextRows = 1
      let usedWidth = 0
      for (const card of cards) {
        const cardWidth = card.getBoundingClientRect().width
        const nextWidth = usedWidth ? usedWidth + gap + cardWidth : cardWidth
        if (usedWidth && nextWidth > width) {
          nextRows += 1
          usedWidth = cardWidth
        } else {
          usedWidth = nextWidth
        }
      }
      const rowCount = Math.min(3, nextRows)
      const rowWidths = Array<number>(rowCount).fill(0)
      const nextPlacement = Array<number>(cards.length).fill(0)
      const measuredCards = cards
        .map((card, index) => ({
          index,
          width: card.getBoundingClientRect().width,
        }))
        .sort((a, b) => b.width - a.width || a.index - b.index)
      for (const card of measuredCards) {
        const row = rowWidths.indexOf(Math.min(...rowWidths))
        nextPlacement[card.index] = row
        rowWidths[row] += card.width + (rowWidths[row] ? gap : 0)
      }
      setRows(rowCount)
      setPlacement((previous) =>
        previous.length === nextPlacement.length &&
        previous.every((row, index) => row === nextPlacement[index])
          ? previous
          : nextPlacement,
      )
    }
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    items
      .querySelectorAll('[data-selection-index]')
      .forEach((child) => observer.observe(child))
    measure()
    return () => observer.disconnect()
  }, [children, rows, placement])

  return (
    <div ref={rootRef} className="w-full min-w-0">
      <ScrollArea className="w-full min-w-0 overflow-hidden [&_[data-slot=scroll-area-scrollbar]]:hidden">
        <div
          ref={itemsRef}
          role="group"
          aria-label={label}
          className="flex w-max flex-col gap-2"
        >
          {Array.from({ length: rows }, (_, row) => (
            <div key={row} className="flex w-max gap-2">
              {cards.map((card, index) =>
                (placement[index] ?? index % rows) === row ? (
                  <div
                    key={index}
                    data-selection-index={index}
                    className="flex w-max max-w-[var(--selection-width)] shrink-0 [&>label]:max-w-full"
                  >
                    {card}
                  </div>
                ) : null,
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
