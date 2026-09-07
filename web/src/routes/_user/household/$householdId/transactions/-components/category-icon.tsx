import { useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { Icon, type IconNode } from 'lucide-react'
import { dynamicIconImports, type IconName } from 'lucide-react/dynamic'

const icons = new Map<IconName, IconNode>()
const pending = new Map<IconName, Promise<void>>()
const listeners = new Map<IconName, Set<() => void>>()

export function CategoryIcon({
  name,
  fallback,
}: {
  name: IconName
  fallback: ReactNode
}) {
  const iconNode = useSyncExternalStore(
    (listener) => {
      let subscribers = listeners.get(name)
      if (!subscribers) {
        subscribers = new Set()
        listeners.set(name, subscribers)
      }
      subscribers.add(listener)
      return () => {
        subscribers.delete(listener)
        if (!subscribers.size) listeners.delete(name)
      }
    },
    () => icons.get(name),
  )

  useEffect(() => {
    if (icons.has(name) || pending.has(name)) return
    const request = dynamicIconImports[name]()
      .then((module) => {
        icons.set(name, module.__iconNode)
        listeners.get(name)?.forEach((listener) => listener())
      })
      .catch(() => {
        /* Keep the transaction-type fallback if the icon cannot load. */
      })
      .finally(() => pending.delete(name))
    pending.set(name, request)
  }, [name])

  return (
    <span
      className="flex size-4 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      {iconNode ? <Icon iconNode={iconNode} className="size-4" /> : fallback}
    </span>
  )
}
