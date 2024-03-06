import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/settings",
)({
  component: Page,
});

function Page() {
  const { workspace } = Route.useRouteContext();
  console.log(workspace);

  // const { data: categories } = useSuspenseQuery(
  //   categoriesQueryOptions(workspace.id),
  // );
  //
  // const { data: accounts } = useSuspenseQuery(
  //   accountsQueryOptions(workspace.id),
  // );

  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Settings</PageHeaderHeading>
        <PageHeaderDescription className="">
          Manage your workspace settings.
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-4" />
    </div>
  );
}
