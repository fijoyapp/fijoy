import { Badge } from "@/components/ui/badge";
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
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { getWorkspaceByNamespaceQueryOptions } from "@/lib/queries/workspace";
import { WorkspaceProvider } from "@/workspace";
import {
  Link,
  // LinkProps,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Bell,
  CircleUser,
  CreditCard,
  Home,
  LineChart,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { env } from "@/env";
import { ModeToggle } from "@/components/mode-toggle";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CenterLoadingSpinner from "@/components/center-loading-spinner";

export const Route = createFileRoute("/_protected/workspace/$namespace")({
  beforeLoad: async ({ params, context }) => {
    const workspaceQueryOpts = getWorkspaceByNamespaceQueryOptions({
      namespace: params.namespace,
      context,
    });
    const workspace =
      await context.queryClient.ensureQueryData(workspaceQueryOpts);
    return { workspace };
  },
  pendingComponent: CenterLoadingSpinner,
  errorComponent: ({ error }) => (
    <PageHeader>
      <PageHeaderHeading>Oops!</PageHeaderHeading>
      <PageHeaderDescription>Something went wrong :(</PageHeaderDescription>
      <div className="py-2"></div>
      <Button asChild>
        <Link to={"/workspace"}>Go Back</Link>
      </Button>
      <div className="py-2"></div>

      <div>{(error as Error).toString()}</div>
    </PageHeader>
  ),

  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getAccountsQueryOptions({ context }));
  },
  component: Page,
});

// type NavLink = {
//   link: LinkProps;
//   name: string;
//   icon: React.ReactNode;
// };

// FIXME: https://github.com/TanStack/router/issues/1271#
// waiting for this issue to be resolved
// const navLinks: NavLink[] = [
//   {
//     name: "Overview",
//     link: { from: "/workspace/$namespace", to: "/workspace/$namespace" },
//     icon: <Home className="h-4 w-4" />,
//   },
//   {
//     name: "Transactions",
//     link: {
//       from: "/workspace/$namespace",
//       to: "/workspace/$namespace/transactions",
//     },
//     icon: <ArrowLeftRight className="h-4 w-4" />,
//   },
//   {
//     name: "Accounts",
//     link: {
//       from: "/workspace/$namespace",
//       to: "/workspace/$namespace/accounts",
//     },
//     icon: <CreditCard className="h-4 w-4" />,
//   },
//   {
//     name: "Categories",
//     link: {
//       from: "/workspace/$namespace",
//       to: "/workspace/$namespace/categories",
//     },
//     icon: <List className="h-4 w-4" />,
//   },
//   {
//     name: "Settings",
//     link: {
//       from: "/workspace/$namespace",
//       to: "/workspace/$namespace/settings",
//     },
//     icon: <Settings className="h-4 w-4" />,
//   },
// ];

function Page() {
  const { namespace } = Route.useParams();
  // const { workspace } = Route.useRouteContext();
  const matchRoute = useMatchRoute();
  const { queryClient } = Route.useRouteContext();

  return (
    <WorkspaceProvider namespace={namespace}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                to={"/workspace/$namespace"}
                params={{ namespace }}
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
                <Link
                  from="/workspace/$namespace"
                  to="/workspace/$namespace"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                    matchRoute({ to: "/workspace/$namespace" })
                      ? "bg-muted text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <Home className="h-4 w-4" />
                  Overview
                </Link>
                <Link
                  from="/workspace/$namespace"
                  to="/workspace/$namespace/transactions"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                    matchRoute({
                      to: "/workspace/$namespace/transactions",
                      fuzzy: true,
                    })
                      ? "bg-muted text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  Transactions
                  {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"> */}
                  {/*   6 */}
                  {/* </Badge> */}
                </Link>
                <Link
                  from="/workspace/$namespace"
                  to="/workspace/$namespace/accounts"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                    matchRoute({
                      to: "/workspace/$namespace/accounts",
                      fuzzy: true,
                    })
                      ? "bg-muted text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <CreditCard className="h-4 w-4" />
                  Accounts
                </Link>
                <Link
                  from="/workspace/$namespace"
                  to="/workspace/$namespace/settings"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary",
                    matchRoute({
                      to: "/workspace/$namespace/settings",
                      fuzzy: true,
                    })
                      ? "bg-muted text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <DiscordCard />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
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
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  {/* FIXME: update all these once the link issue above gets resolved */}
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <span className="sr-only">Fijoy</span>
                    <Icons.logo className="h-6 w-6" />
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge>
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link>
                </nav>
                <div className="mt-auto">
                  <DiscordCard />
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
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
                    queryClient.clear();
                    window.location.replace(
                      env.VITE_SERVER_URL + "/v1/auth/logout",
                    );
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {/* NOTE: subtract 3.5rem which is the height of the header */}
          <main className="flex max-h-[calc(100vh-3.5rem)] flex-1 flex-col gap-4 overflow-y-scroll p-4 lg:gap-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </WorkspaceProvider>
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
