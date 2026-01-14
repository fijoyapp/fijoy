import {
  CreditCardIcon,
  ReceiptIcon,
  TagIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { NavProjects } from './nav-projects'
import type { LucideIcon } from 'lucide-react'

// import { NavMain } from '@/components/nav-main'
import type { LinkOptions, ValidateLinkOptions } from '@tanstack/react-router'
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

const projects: Array<{
  name: string
  link: LinkOptions
  icon: LucideIcon
}> = [
  {
    name: 'Transactions',
    link: {
      to: '/household/$householdId/transactions',
      activeOptions: {
        exact: false,
        includeSearch: false,
      },
      search: (prev) => ({
        ...prev,
        showNewTransaction: prev.showNewTransaction,
      }),
    },
    icon: ReceiptIcon,
  },
  {
    name: 'Accounts',
    link: {
      to: '/household/$householdId/accounts',
      activeOptions: {
        exact: false,
        includeSearch: false,
      },
      search: (prev) => ({
        ...prev,
        showNewTransaction: prev.showNewTransaction,
      }),
    },
    icon: CreditCardIcon,
  },
  {
    name: 'Investments',
    link: {
      to: '/household/$householdId/investments',
      activeOptions: {
        exact: false,
        includeSearch: false,
      },
      search: (prev) => ({
        ...prev,
        showNewTransaction: prev.showNewTransaction,
      }),
    },
    icon: TrendingUpIcon,
  },
  {
    name: 'Categories',
    link: {
      to: '/household/$householdId/categories',
      activeOptions: {
        exact: false,
        includeSearch: false,
      },
      search: (prev) => ({
        ...prev,
        showNewTransaction: prev.showNewTransaction,
      }),
    },
    icon: TagIcon,
  },
]

const user = {
  name: 'Joey',
  email: 'joey@itsjoeoui.com',
  avatar: '/avatars/shadcn.jpg',
}

type AppSidebarProps = {
  fragmentRef: appSidebarFragment$key
} & React.ComponentProps<typeof Sidebar>

const appSidebarFragment = graphql`
  fragment appSidebarFragment on Query {
    ...householdSwitcherFragment
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
        <NavProjects projects={projects} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
