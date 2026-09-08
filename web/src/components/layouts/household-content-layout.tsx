import type { ReactNode } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { MobileActionDockSpacer } from '@/components/app-action-dock'
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
    <ScrollArea className="h-full min-h-0 overflow-y-auto">
      <div className={cn('mx-auto max-w-5xl p-4', className)}>
        {children}
        <MobileActionDockSpacer />
      </div>
    </ScrollArea>
  )
}

export { HouseholdContentLayout }
