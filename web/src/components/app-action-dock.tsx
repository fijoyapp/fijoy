import { Link } from '@tanstack/react-router'
import { MenuIcon, PlusIcon, RefreshCwIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NAV } from '@/constant'
import { useLogTransaction } from '@/hooks/use-log-transaction'

type AppActionDockProps = {
  isMobile: boolean
  isRefreshing: boolean
  onRefresh: () => void
}

export function AppActionDock({
  isMobile,
  isRefreshing,
  onRefresh,
}: AppActionDockProps) {
  const { open: openLogTransaction } = useLogTransaction()

  if (!isMobile) {
    return (
      <Button
        className="fixed right-4 bottom-4 z-20 size-10 rounded-none [&_svg:not([class*='size-'])]:size-5"
        onClick={() => openLogTransaction('expense')}
        aria-label="New entry"
        title="New entry"
      >
        <PlusIcon />
      </Button>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 md:hidden">
      <nav
        aria-label="Quick actions"
        className="bg-background/90 ring-foreground/15 pointer-events-auto mx-auto grid h-14 w-[90%] grid-cols-[1fr_1.15fr_1fr] overflow-hidden rounded-none ring-1 backdrop-blur-xl"
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-full w-full flex-col gap-0.5 rounded-none border-0 text-[0.625rem] font-medium tracking-[0.01em]"
              >
                <MenuIcon className="size-4" />
                Pages
                <span className="sr-only">Open page navigation</span>
              </Button>
            }
          />
          <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={16}
            className="bg-popover/95 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-none p-1.5 shadow-none backdrop-blur-xl"
          >
            <div className="text-muted-foreground px-2 pt-1 pb-2 text-[0.625rem] font-medium tracking-[0.02em] uppercase">
              Go to
            </div>
            {NAV.map((item) => {
              const Icon = item.icon

              return (
                <DropdownMenuItem
                  key={item.name}
                  className="min-h-10 rounded-none"
                  render={
                    <Link
                      {...item.link}
                      activeProps={{
                        className:
                          'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
                      }}
                    >
                      <Icon />
                      <span>{item.name}</span>
                    </Link>
                  }
                />
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="p-1.5">
          <Button
            onClick={() => openLogTransaction('expense')}
            className="h-full w-full flex-col gap-0.5 rounded-none border-0 text-[0.625rem] font-semibold tracking-[0.01em]"
          >
            <PlusIcon className="size-4" />
            New entry
          </Button>
        </div>

        <Button
          variant="ghost"
          className="h-full w-full flex-col gap-0.5 rounded-none border-0 text-[0.625rem] font-medium tracking-[0.01em]"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCwIcon
            className={
              isRefreshing
                ? 'size-4 animate-spin motion-reduce:animate-none'
                : 'size-4'
            }
          />
          {isRefreshing ? 'Syncing' : 'Sync data'}
        </Button>
      </nav>
    </div>
  )
}

export function MobileActionDockSpacer() {
  return (
    <div
      aria-hidden="true"
      className="h-[calc(5rem+env(safe-area-inset-bottom))] shrink-0 md:hidden"
    />
  )
}
