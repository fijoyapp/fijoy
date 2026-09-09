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
        className="fixed right-5 bottom-5 z-20 size-11 rounded-2xl shadow-[0_10px_28px_var(--glass-shadow-color)] [&_svg:not([class*='size-'])]:size-5"
        onClick={() => openLogTransaction('expense')}
        aria-label="New entry"
        title="New entry"
      >
        <PlusIcon />
      </Button>
    )
  }

  return (
    <div className="bg-background z-40 shrink-0 px-4 pt-2 pb-4 md:hidden">
      <nav
        aria-label="Quick actions"
        className="liquid-glass-chrome mx-auto grid h-16 w-full max-w-[26rem] grid-cols-[1fr_1.15fr_1fr] gap-1 overflow-hidden rounded-[1.25rem] p-1.5"
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-full w-full flex-col gap-0.5 rounded-xl border-0 text-[0.625rem] font-medium tracking-[0.01em]"
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
            className="w-[min(12rem,calc(100vw-2rem))] overflow-hidden rounded-2xl p-1.5"
          >
            <div className="text-muted-foreground px-2 pt-1 pb-2 text-[0.625rem] font-medium tracking-[0.02em] uppercase">
              Go to
            </div>
            {NAV.map((item) => {
              const Icon = item.icon

              return (
                <DropdownMenuItem
                  key={item.name}
                  className="min-h-10 rounded-xl"
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

        <div>
          <Button
            onClick={() => openLogTransaction('expense')}
            className="h-full w-full flex-col gap-0.5 rounded-xl border-0 text-[0.625rem] font-semibold tracking-[0.01em]"
          >
            <PlusIcon className="size-4" />
            New entry
          </Button>
        </div>

        <Button
          variant="ghost"
          className="h-full w-full flex-col gap-0.5 rounded-xl border-0 text-[0.625rem] font-medium tracking-[0.01em]"
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
