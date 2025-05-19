import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Link,
  Outlet,
  ValidateLinkOptions,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import {
  Bell,
  CircleUser,
  History,
  Home,
  Landmark,
  LucideIcon,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { useState } from "react";
import { motion } from "framer-motion";
import { logout } from "@/lib/auth";
import { graphql } from "relay-runtime";
import { loadQuery } from "react-relay";
import { routeProfileQuery } from "./__generated__/routeProfileQuery.graphql";

export const RouteProfileQuery = graphql`
  query routeProfileQuery {
    user {
      ...userFragment
    }
    profiles {
      ...profileFragment
    }
    accounts {
      id
      ...accountsFragment
    }
    transactions {
      id
      ...transactionCardFragment
    }
    currencies {
      ...currencyFragment
    }
  }
`;

export const Route = createFileRoute("/_protected/_profile")({
  beforeLoad: async ({ context }) => {
    const profileQueryRef = loadQuery<routeProfileQuery>(
      context.environment,
      RouteProfileQuery,
      {},
      { fetchPolicy: "store-or-network" },
    );
    return { profileQueryRef };
  },
  pendingComponent: CenterLoadingSpinner,
  errorComponent: ({ error }) => (
    <PageHeader>
      <PageHeaderHeading>Oops!</PageHeaderHeading>
      <PageHeaderDescription>Something went wrong :(</PageHeaderDescription>
      <div className="py-2"></div>
      <Button asChild>
        <Link to={"/"}>Go Back</Link>
      </Button>
      <div className="py-2"></div>

      <div>{(error as Error).toString()}</div>
    </PageHeader>
  ),

  // loader: ({ context }) => {
  //   context.queryClient.ensureQueryData(getAccountsQueryOptions({ context }));
  // },
  component: Page,
});

type NavLink = {
  link: ValidateLinkOptions;
  name: string;
  icon: LucideIcon;
  fuzzy: boolean;
};

const navLinks: NavLink[] = [
  {
    name: "Home",
    link: { from: Route.fullPath, to: "/home" },
    icon: Home,
    fuzzy: false,
  },
  {
    name: "Accounts",
    link: {
      from: Route.fullPath,
      to: "/accounts",
    },
    icon: Landmark,
    fuzzy: true,
  },
  {
    name: "Transactions",
    link: {
      from: Route.fullPath,
      to: "/transactions",
    },
    icon: History,
    fuzzy: true,
  },
  {
    name: "Settings",
    link: {
      from: Route.fullPath,
      to: "/settings",
    },
    icon: Settings,
    fuzzy: true,
  },
];

function Page() {
  const matchRoute = useMatchRoute();
  const [sheetOpen, setSheetOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              to={"/home"}
              className="flex items-center gap-2 font-semibold"
            >
              <Icons.logo className="h-6 w-6" />
              <span className="">Fijoy</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((navLink) => (
                <motion.div
                  layout
                  key={navLink.name}
                  onMouseOver={() => setActiveTab(navLink.name)}
                  onMouseLeave={() => setActiveTab(null)}
                  className="relative"
                >
                  <Link
                    {...navLink.link}
                    key={navLink.name}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      matchRoute({
                        to: navLink.link.to,
                        fuzzy: navLink.fuzzy,
                      })
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    <navLink.icon className="h-4 w-4" />
                    {navLink.name}
                    {activeTab === navLink.name ? (
                      <motion.div
                        layoutId="tab-indicator"
                        className="bg-primary/10 absolute inset-0 rounded-lg"
                      />
                    ) : null}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <DiscordCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet open={sheetOpen} onOpenChange={(open) => setSheetOpen(open)}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex max-h-screen flex-col">
              <Link
                to={"/home"}
                className="flex items-center gap-2 font-semibold"
              >
                <Icons.logo className="h-6 w-6" />
                <span className="">Fijoy</span>
              </Link>
              <nav className="grid gap-2 text-lg font-medium">
                {navLinks.map((navLink) => (
                  <Link
                    {...navLink.link}
                    key={navLink.name}
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      "text-muted-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",
                      matchRoute({
                        to: navLink.link.to,
                        fuzzy: navLink.fuzzy,
                      })
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <navLink.icon className="h-6 w-6" />
                    {navLink.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <DiscordCard />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  logout();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {/* NOTE: subtract 3.5rem which is the height of the header, also make sure to subtract width too */}
        <main className="scrollbar flex max-h-[calc(100vh-3.5rem)] w-screen flex-1 flex-col gap-4 overflow-y-scroll md:max-w-[calc(100vw-220px)] lg:max-h-[calc(100vh-3.75rem)] lg:max-w-[calc(100vw-280px)] lg:gap-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function DiscordCard() {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>Join our Discord</CardTitle>
        <CardDescription>
          Keep up to date with the latest features and updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button size="sm" className="w-full" asChild>
          <a target="_blank" href={siteConfig.links.discord}>
            Join
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
