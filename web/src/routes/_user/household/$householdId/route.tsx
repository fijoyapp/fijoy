import { EyeIcon, EyeOffIcon, Moon, Sun, GripVertical, X } from 'lucide-react'
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { graphql } from 'relay-runtime'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import invariant from 'tiny-invariant'
import { Rnd } from 'react-rnd'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import type { routeHouseholdIdQuery } from './__generated__/routeHouseholdIdQuery.graphql'
import { AppSidebar } from '@/components/app-sidebar'
import { MobileFabNav } from '@/components/mobile-fab-nav'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Item } from '@/components/ui/item'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { usePrivacyMode } from '@/hooks/use-privacy-mode'
import { HouseholdProvider } from '@/hooks/use-household'
import {
  LOCAL_STORAGE_HOUSEHOLD_ID_KEY,
  LOCAL_STORAGE_RND_POSITION_KEY,
} from '@/constant'
import { useTheme } from '@/components/theme-provider'
import { PendingComponent } from '@/components/pending-component'
import { environment } from '@/environment'
import { CommandMenu } from '@/components/command-menu'
import { LogTransaction } from './transactions/-components/log-transaction'
import { zodValidator } from '@tanstack/zod-adapter'
import { useIsMobile } from '@/hooks/use-mobile'

const routeHouseholdIdQuery = graphql`
  query routeHouseholdIdQuery {
    households {
      id
      # eslint-disable-next-line relay/unused-fields
      name
      # eslint-disable-next-line relay/unused-fields
      locale
      # eslint-disable-next-line relay/unused-fields
      currency {
        id
        code
      }
    }
    ...appSidebarFragment
    ...logTransactionFragment
  }
`

const searchSchema = z.object({
  showNewTransaction: z.boolean().optional().default(false),
})

export const Route = createFileRoute('/_user/household/$householdId')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  beforeLoad: ({ params }) => {
    localStorage.setItem(LOCAL_STORAGE_HOUSEHOLD_ID_KEY, params.householdId)
    return loadQuery<routeHouseholdIdQuery>(
      environment,
      routeHouseholdIdQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

function RouteComponent() {
  const queryRef = Route.useRouteContext()
  const data = usePreloadedQuery<routeHouseholdIdQuery>(
    routeHouseholdIdQuery,
    queryRef,
  )
  const search = Route.useSearch()
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const { householdId } = Route.useParams()

  const household = data.households.find((h) => h.id === householdId)
  invariant(household, 'Household not found')

  const { isPrivacyModeEnabled, togglePrivacyMode } = usePrivacyMode()
  const { setTheme } = useTheme()

  // State for Rnd position (desktop only)
  const [rndPosition, setRndPosition] = useState<RndPosition>(
    getRndPositionFromStorage,
  )

  // Update localStorage when position changes
  useEffect(() => {
    saveRndPositionToStorage(rndPosition)
  }, [rndPosition])

  const setLogTransactionOpen = (open: boolean) => {
    navigate({
      to: '.',
      search: (prev) => ({ ...prev, showNewTransaction: open }),
    })
  }

  return (
    <HouseholdProvider household={household}>
      <CommandMenu />
      <SidebarProvider>
        <AppSidebar fragmentRef={data} />
        <SidebarInset>
          <header className="bg-background border-b sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 cursor-pointer" />
              <Separator orientation="vertical" className="mr-2" />
              <Breadcrumb>
                <BreadcrumbList>
                  {/* <BreadcrumbItem className="hidden md:block"> */}
                  {/*   <BreadcrumbLink href="#"> */}
                  {/*     Building Your Application */}
                  {/*   </BreadcrumbLink> */}
                  {/* </BreadcrumbItem> */}
                  {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                  {/* <BreadcrumbItem> */}
                  {/*   <BreadcrumbPage>Data Fetching</BreadcrumbPage> */}
                  {/* </BreadcrumbItem> */}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="grow"></div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="cursor-pointer">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                }
              ></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={togglePrivacyMode}
            >
              {isPrivacyModeEnabled ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
            <div className="px-1"></div>
          </header>
          <div className="flex flex-1 flex-col">
            <Outlet />
          </div>
        </SidebarInset>
        <MobileFabNav />

        {/* Mobile: Drawer for New Transaction Form */}
        {isMobile && (
          <Drawer
            open={search.showNewTransaction}
            onOpenChange={(open) => {
              setLogTransactionOpen(open)
            }}
          >
            <DrawerContent className="bg-background">
              {/* <DrawerHeader className="bg-background"> */}
              {/*   <DrawerTitle>Log Transaction</DrawerTitle> */}
              {/* </DrawerHeader> */}
              <div className="py-2"></div>
              <div className="overflow-y-auto bg-background">
                <LogTransaction fragmentRef={data} />
              </div>
            </DrawerContent>
          </Drawer>
        )}

        {/* Desktop: Resizable & Draggable New Transaction Form */}
        {!isMobile && search.showNewTransaction && (
          <Rnd
            position={{ x: rndPosition.x, y: rndPosition.y }}
            size={{ width: rndPosition.width, height: 'auto' }}
            onDragStop={(_e, d) => {
              setRndPosition((prev) => ({
                ...prev,
                x: d.x,
                y: d.y,
              }))
            }}
            onResizeStop={(_e, _direction, ref, _delta, position) => {
              setRndPosition({
                x: position.x,
                y: position.y,
                width: parseInt(ref.style.width),
              })
            }}
            enableResizing={{
              top: false,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            minWidth={400}
            maxWidth={1200}
            bounds="window"
            dragHandleClassName="drag-handle"
            style={{ zIndex: 50 }}
          >
            <Item className="w-full overflow-hidden shadow-2xl bg-muted p-0 gap-0 h-full">
              {/* Drag Handle Header */}
              <div className="w-full drag-handle flex items-center justify-between border-b px-4 py-2 cursor-move">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-sm">Log Transaction</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setLogTransactionOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Transaction Form */}
              <LogTransaction fragmentRef={data} />
            </Item>
          </Rnd>
        )}
      </SidebarProvider>
    </HouseholdProvider>
  )
}

type RndPosition = {
  x: number
  y: number
  width: number
}

const getDefaultRndPosition = (): RndPosition => ({
  x: window.innerWidth - 700,
  y: 80,
  width: 650,
})

const getRndPositionFromStorage = (): RndPosition => {
  const stored = localStorage.getItem(LOCAL_STORAGE_RND_POSITION_KEY)
  if (stored) {
    try {
      return JSON.parse(stored) as RndPosition
    } catch {
      return getDefaultRndPosition()
    }
  }
  return getDefaultRndPosition()
}

const saveRndPositionToStorage = (position: RndPosition) => {
  localStorage.setItem(LOCAL_STORAGE_RND_POSITION_KEY, JSON.stringify(position))
}
