import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { graphql, useFragment } from 'react-relay'
import { householdSwitcherFragment$key } from './__generated__/householdSwitcherFragment.graphql'
import { useNavigate } from '@tanstack/react-router'
import { useHousehold } from '@/hooks/use-household'

const HouseholdSwitcherFragment = graphql`
  fragment householdSwitcherFragment on Query {
    households {
      id
      name
    }
  }
`

type HouseholdSwitcherProps = {
  fragmentRef: householdSwitcherFragment$key
}

export function HouseholdSwitcher({ fragmentRef }: HouseholdSwitcherProps) {
  const { isMobile } = useSidebar()
  const data = useFragment(HouseholdSwitcherFragment, fragmentRef)
  const { household: activeHousehold } = useHousehold()
  const navigate = useNavigate()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Logo size="large" name={activeHousehold.name} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeHousehold.name}
                  </span>
                  {/* <span className="truncate text-xs">{activeTeam.plan}</span> */}
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Teams
              </DropdownMenuLabel>
              {data.households.map((household, index) => (
                <DropdownMenuItem
                  key={household.name}
                  className="gap-2 p-2"
                  onClick={() =>
                    navigate({
                      to: '/household/$householdId',
                      params: {
                        householdId: household.id,
                      },
                      reloadDocument: true,
                    })
                  }
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Logo size="small" name={household.name} />
                  </div>
                  {household.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => navigate({ to: '/household/new' })}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add household
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

type LogoProps = {
  name: string
  size: 'small' | 'large'
}

function Logo({ name, size }: LogoProps) {
  return (
    <div className={size === 'small' ? 'text-sm' : 'text-lg'}>{name[0]}</div>
  )
}
