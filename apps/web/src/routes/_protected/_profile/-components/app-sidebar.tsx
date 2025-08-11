import {
  Home,
  Landmark,
  Settings,
  History,
  type LucideIcon,
  ChevronDown,
  CircleUser,
  Coins,
  ChevronUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, type ValidateLinkOptions } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/hooks/use-profile";
import { setProfile } from "@/lib/profile";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth";

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
  const { profile, profiles } = useProfile();
  const { user } = useAuth();
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Coins />
                  {profile.name}
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {profiles.map((p) => {
                  return (
                    <DropdownMenuItem
                      key={p.id}
                      onSelect={() => setProfile(p.id)}
                    >
                      <span>{p.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <CircleUser /> {user.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onSelect={() => logout()}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
