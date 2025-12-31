import * as React from 'react'
import {
  ArrowLeftRightIcon,
  ChartNoAxesCombinedIcon,
  SquareTerminal,
  WalletIcon,
} from 'lucide-react'
import { NavProjects } from './nav-projects'
import type { LucideIcon } from 'lucide-react'

// import { NavMain } from '@/components/nav-main'
import type { ValidateLinkOptions } from '@tanstack/react-router'
import { NavUser } from '@/components/nav-user'
import { HouseholdSwitcher } from '@/components/household-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { householdSwitcherFragment$key } from './__generated__/householdSwitcherFragment.graphql'

const navMain: Array<{
  title: string
  link: ValidateLinkOptions
  icon?: LucideIcon
  isActive?: boolean
  items?: Array<{
    title: string
    link: ValidateLinkOptions
  }>
}> = [
  {
    title: 'Main',
    link: {
      to: '/',
    },
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: 'Home',
        link: { to: '/' },
      },
      {
        title: 'New User',
        link: { to: '/household/new' },
      },
      {
        title: 'Household',
        link: { to: '/household' },
      },
      {
        title: 'Accounts',
        link: { to: '/household/$householdId/accounts' },
      },
      {
        title: 'Investments',
        link: { to: '/household/$householdId/investments' },
      },
    ],
  },
]

const projects: Array<{
  name: string
  link: ValidateLinkOptions
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
    },
    icon: ArrowLeftRightIcon,
  },
  {
    name: 'Accounts',
    link: {
      to: '/household/$householdId/accounts',
      activeOptions: {
        exact: false,
        includeSearch: false,
      },
    },
    icon: WalletIcon,
  },
  {
    name: 'Investments',
    link: {
      to: '/household/$householdId/investments',
      activeOptions: {
        exact: false,
        includeSearch: false,
      },
    },
    icon: ChartNoAxesCombinedIcon,
  },
]

const user = {
  name: 'Joey',
  email: 'joey@itsjoeoui.com',
  avatar: '/avatars/shadcn.jpg',
}

type AppSidebarProps = {
  fragmentRef: householdSwitcherFragment$key
} & React.ComponentProps<typeof Sidebar>

export function AppSidebar({ fragmentRef, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HouseholdSwitcher fragmentRef={fragmentRef} />
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
