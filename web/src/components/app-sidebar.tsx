import * as React from 'react'
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  HomeIcon,
  LucideIcon,
  PersonStandingIcon,
  SquareTerminal,
  UsersIcon,
  WalletIcon,
} from 'lucide-react'

// import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { ValidateLinkOptions } from '@tanstack/react-router'
import { NavProjects } from './nav-projects'

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
        link: { to: '/household/accounts' },
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
    link: { to: '/household' },
    icon: HomeIcon,
  },
  {
    name: 'Accounts',
    link: { to: '/household/accounts' },
    icon: WalletIcon,
  },
]

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
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
