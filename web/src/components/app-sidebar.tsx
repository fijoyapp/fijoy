import * as React from 'react'
import {
  AudioWaveform,
  CandlestickChartIcon,
  ChartNoAxesCombinedIcon,
  Command,
  GalleryVerticalEnd,
  HomeIcon,
  PersonStandingIcon,
  SquareTerminal,
  UsersIcon,
  WalletIcon,
} from 'lucide-react'
import { NavProjects } from './nav-projects'
import type { LucideIcon } from 'lucide-react'

// import { NavMain } from '@/components/nav-main'
import type { ValidateLinkOptions } from '@tanstack/react-router'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

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
        link: { to: '/new' },
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
    name: 'Home',
    link: {
      to: '/household/$householdId',
      activeOptions: {
        exact: true,
        includeSearch: false,
      },
    },
    icon: HomeIcon,
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

// This is sample data.
const data = {
  user: {
    name: 'Joey',
    email: 'joey@itsjoeoui.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: "Joey's Household",
      logo: UsersIcon,
      plan: 'Free',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain,
  projects,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
