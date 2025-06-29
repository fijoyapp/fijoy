import {
  Home,
  Landmark,
  Settings,
  History,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, type ValidateLinkOptions } from "@tanstack/react-router";

type NavLink = {
  link: ValidateLinkOptions;
  name: string;
  icon: LucideIcon;
  fuzzy: boolean;
};

const navLinks: NavLink[] = [
  {
    name: "Home",
    link: { to: "/home" },
    icon: Home,
    fuzzy: false,
  },
  {
    name: "Accounts",
    link: {
      to: "/accounts",
    },
    icon: Landmark,
    fuzzy: true,
  },
  {
    name: "Transactions",
    link: {
      to: "/transactions",
    },
    icon: History,
    fuzzy: true,
  },
  {
    name: "Settings",
    link: {
      to: "/settings",
    },
    icon: Settings,
    fuzzy: true,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fijoy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link {...item.link}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
