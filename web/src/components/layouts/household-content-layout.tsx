import type { ReactNode } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface HouseholdContentLayoutProps {
  children: ReactNode
  className?: string
}

function HouseholdContentLayout({
  children,
  className,
}: HouseholdContentLayoutProps) {
  return (
    <ScrollArea className="h-full min-h-0 overflow-hidden [&_[data-slot=scroll-area-viewport]]:overflow-x-hidden">
      <div className={cn('mx-auto max-w-5xl p-4', className)}>{children}</div>
    </ScrollArea>
  )
}

export { HouseholdContentLayout }
