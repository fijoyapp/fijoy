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
    <div className="bg-background fixed inset-x-0 bottom-0 z-40 md:hidden">
      <nav
        aria-label="Quick actions"
        className="border-border bg-background grid h-14 grid-cols-3 border-t"
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="border-border h-full w-full flex-col gap-0.5 rounded-none border-0 border-r text-[0.625rem] font-medium tracking-wide uppercase"
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
            sideOffset={12}
            className="w-[min(18rem,calc(100vw-2rem))] rounded-none p-1 shadow-none"
          >
            <div className="text-muted-foreground px-2 pt-1 pb-2 text-[0.625rem] tracking-wider uppercase">
              Go to
            </div>
            {NAV.map((item) => {
              const Icon = item.icon

              return (
                <DropdownMenuItem
                  key={item.name}
                  className="min-h-9 rounded-none"
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

        <div className="border-border border-r">
          <Button
            onClick={() => openLogTransaction('expense')}
            className="h-full w-full flex-col gap-0.5 rounded-none border-0 text-[0.625rem] font-semibold tracking-wide uppercase"
          >
            <PlusIcon className="size-4" />
            New entry
          </Button>
        </div>

        <Button
          variant="ghost"
          className="h-full w-full flex-col gap-0.5 rounded-none border-0 text-[0.625rem] font-medium tracking-wide uppercase"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCwIcon
            className={isRefreshing ? 'size-4 animate-spin' : 'size-4'}
          />
          {isRefreshing ? 'Syncing' : 'Sync data'}
        </Button>
      </nav>
      <div className="bg-background h-[env(safe-area-inset-bottom)]" />
    </div>
  )
}
