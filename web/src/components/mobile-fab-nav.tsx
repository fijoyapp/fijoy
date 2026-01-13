import { Menu, CreditCard, TrendingUp, Tag, Receipt } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/use-mobile'
import { useParams } from '@tanstack/react-router'

interface NavItem {
  name: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

export function MobileFabNav() {
  const isMobile = useIsMobile()
  const { householdId } = useParams({ from: '/_user/household/$householdId' })
  const router = useRouterState()

  // Don't render on mobile if not available
  if (!isMobile) {
    return null
  }

  const navItems: NavItem[] = [
    {
      name: 'Transactions',
      path: `/household/${householdId}/transactions`,
      icon: Receipt,
    },
    {
      name: 'Accounts',
      path: `/household/${householdId}/accounts`,
      icon: CreditCard,
    },
    {
      name: 'Investments',
      path: `/household/${householdId}/investments`,
      icon: TrendingUp,
    },
    {
      name: 'Categories',
      path: `/household/${householdId}/categories`,
      icon: Tag,
    },
  ]

  // Get current path to highlight active item
  const currentPath = router.location.pathname

  return (
    <div className="fixed bottom-4 left-4">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button size="icon-xl" className="rounded-full">
              <Menu className="" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath.includes(item.path)

            return (
              <DropdownMenuItem
                key={item.name}
                render={
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 cursor-pointer ${
                      isActive ? 'font-semibold' : ''
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                }
              />
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
