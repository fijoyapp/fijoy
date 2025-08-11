import invariant from "tiny-invariant";
import { Button } from "@/components/ui/button";
import {
  Link,
  Navigate,
  Outlet,
  createFileRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { useFragment } from "react-relay";
import { ProfileProvider } from "@/profile";
import { ProfilesFragment } from "@/lib/queries/profiles";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./-components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import type { profilesFragment$key } from "@/lib/queries/__generated__/profilesFragment.graphql";
import { useData } from "@/hooks/use-data";

export const Route = createFileRoute("/_protected/_profile")({
  pendingComponent: CenterLoadingSpinner,
  errorComponent: ({ error }: { error: Error }) => (
    <PageHeader>
      <PageHeaderHeading>Oops!</PageHeaderHeading>
      <PageHeaderDescription>Something went wrong :(</PageHeaderDescription>
      <div className="py-2"></div>
      <Button asChild>
        <Link to={"/"}>Go Back</Link>
      </Button>
      <div className="py-2"></div>

      <div>{error.toString()}</div>
    </PageHeader>
  ),
  component: Page,
});

function Page() {
  const matchRoute = useMatchRoute();

  // const [sheetOpen, setSheetOpen] = useState(false);

  // const [activeTab, setActiveTab] = useState<string | null>(null);
  const { data } = useData();

  const profiles = useFragment<profilesFragment$key>(
    ProfilesFragment,
    data.profiles,
  );
  // const environment = useRelayEnvironment();

  invariant(profiles);
  invariant(data.profiles);

  // const refresh = useCallback(() => {
  //   toast.promise(
  //     fetchQuery<RootQuery>(
  //       environment,
  //       rootQuery,
  //       { hasUser: true, hasProfile: true },
  //       { fetchPolicy: "network-only" },
  //     ).toPromise(),
  //     {
  //       success: "Data refreshed successfully!",
  //       error: "Failed to refresh data.",
  //     },
  //   );
  // }, [environment]);

  if (profiles.length === 0 && !matchRoute({ to: "/setup" })) {
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  return (
    <SidebarProvider>
      <ProfileProvider
        profiles={profiles}
        profilesRef={data.profiles}
        profileRef={data}
      >
        <AppSidebar />
        <div className="flex h-screen w-full flex-col">
          <header className="flex h-12 flex-shrink-0 items-center">
            <div className="px-2" />
            <SidebarTrigger className="size-4" />
            <div className="px-2" />
            <Separator orientation="vertical" className="h-8" />
            <div className="px-2" />
            {matchRoute({ to: "/home" }) && (
              <div className="font-medium">Home</div>
            )}
            {matchRoute({ to: "/accounts", fuzzy: true }) && (
              <div className="font-medium">Accounts</div>
            )}
            {matchRoute({ to: "/transactions", fuzzy: true }) && (
              <div className="font-medium">Transactions</div>
            )}
            {matchRoute({ to: "/settings/categories" }) && (
              <div className="font-medium">Categories</div>
            )}
            {matchRoute({ to: "/settings/currencies" }) && (
              <div className="font-medium">Currencies</div>
            )}
            {matchRoute({ to: "/settings/profiles" }) && (
              <div className="font-medium">Profiles</div>
            )}
            <div className="grow"></div>
          </header>
          <main className="mx-4 mb-4 flex-1 overflow-y-auto rounded-lg p-2">
            <Outlet />
          </main>
        </div>
      </ProfileProvider>
    </SidebarProvider>
  );
}

// function DiscordCard() {
//   return (
//     <Card>
//       <CardHeader className="p-4">
//         <CardTitle>Join our Discord</CardTitle>
//         <CardDescription>
//           Keep up to date with the latest features and updates.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         <Button size="sm" className="w-full" asChild>
//           <a target="_blank" href={siteConfig.links.discord}>
//             Join
//           </a>
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }
