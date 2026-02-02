import { NavProjects } from './nav-projects'
import { NavUser } from '@/components/nav-user'
import { HouseholdSwitcher } from '@/components/household-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { graphql } from 'relay-runtime'
import { appSidebarFragment$key } from './__generated__/appSidebarFragment.graphql'
import { useFragment } from 'react-relay'
import { NAV } from '@/constant'

type AppSidebarProps = {
  fragmentRef: appSidebarFragment$key
} & React.ComponentProps<typeof Sidebar>

const appSidebarFragment = graphql`
  fragment appSidebarFragment on Query {
    ...householdSwitcherFragment
    ...navUserFragment
  }
`

export function AppSidebar({ fragmentRef, ...props }: AppSidebarProps) {
  const data = useFragment(appSidebarFragment, fragmentRef)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HouseholdSwitcher fragmentRef={data} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={NAV} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser fragmentRef={data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
