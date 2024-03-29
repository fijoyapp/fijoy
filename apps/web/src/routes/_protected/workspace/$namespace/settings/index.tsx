import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { Link, createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, List, Settings, Users } from "lucide-react";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/settings/",
)({
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Configure your workspace settings
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link
          from={Route.fullPath}
          to={"/workspace/$namespace/settings/general"}
        >
          <Card className="transition-all hover:bg-secondary">
            <div className="flex items-center">
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>
                  Manage your general workspace settings
                </CardDescription>
              </CardHeader>
              <div className="grow"></div>
              <Settings />
              <div className="px-4"></div>
            </div>
          </Card>
        </Link>
        <Link from={Route.fullPath} to={"/workspace/$namespace/settings/users"}>
          <Card className="transition-all hover:bg-secondary">
            <div className="flex items-center">
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Add or remove users from this workspace
                </CardDescription>
              </CardHeader>
              <div className="grow"></div>
              <Users />
              <div className="px-4"></div>
            </div>
          </Card>
        </Link>
        <Link
          from={Route.fullPath}
          to={"/workspace/$namespace/settings/categories"}
        >
          <Card className="transition-all hover:bg-secondary">
            <div className="flex items-center">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Tweak your transaction categories
                </CardDescription>
              </CardHeader>
              <div className="grow"></div>
              <List />
              <div className="px-4"></div>
            </div>
          </Card>
        </Link>
        <Link
          from={Route.fullPath}
          to={"/workspace/$namespace/settings/currency"}
        >
          <Card className="transition-all hover:bg-secondary">
            <div className="flex items-center">
              <CardHeader>
                <CardTitle>Currency and Display</CardTitle>
                <CardDescription>
                  Configure how things are displayed
                </CardDescription>
              </CardHeader>
              <div className="grow"></div>
              <DollarSign />
              <div className="px-4"></div>
            </div>
          </Card>
        </Link>
      </div>
    </>
  );
}
