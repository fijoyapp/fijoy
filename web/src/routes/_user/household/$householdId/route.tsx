import { Moon, Sun } from 'lucide-react'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { usePrivacyMode } from '@/hooks/use-privacy-mode'
import { HouseholdProvider } from '@/hooks/use-household'
import { LOCAL_STORAGE_HOUSEHOLD_ID_KEY } from '@/constant'
import { useTheme } from '@/components/theme-provider'

export const Route = createFileRoute('/_user/household/$householdId')({
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    localStorage.setItem(LOCAL_STORAGE_HOUSEHOLD_ID_KEY, params.householdId)
  },
})

function RouteComponent() {
  const { householdId } = Route.useParams()
  const { isPrivacyModeEnabled, togglePrivacyMode } = usePrivacyMode()
  const { setTheme } = useTheme()

  return (
    <HouseholdProvider householdId={householdId}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background border-b sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 " />
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
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
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
            <Button variant="outline" onClick={togglePrivacyMode}>
              {isPrivacyModeEnabled ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
            <div className="px-1"></div>
          </header>
          <div className="flex flex-1 flex-col">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HouseholdProvider>
  )
}
