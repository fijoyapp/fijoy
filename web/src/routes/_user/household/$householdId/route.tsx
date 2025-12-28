import { Outlet, createFileRoute } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
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

export const Route = createFileRoute('/_user/household/$householdId')({
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    localStorage.setItem(LOCAL_STORAGE_HOUSEHOLD_ID_KEY, params.householdId)
  },
})

function RouteComponent() {
  const { householdId } = Route.useParams()
  const { isPrivacyModeEnabled, togglePrivacyMode } = usePrivacyMode()

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
