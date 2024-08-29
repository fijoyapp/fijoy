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
import { DollarSign } from "lucide-react";

export const Route = createFileRoute("/_protected/_profile/settings/")({
  component: Page,
});

function Page() {
  return (
    <div className="p-4 lg:p-6">
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Configure your Fijoy profile
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2"></div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link from={Route.fullPath} to={"/settings/currency"}>
          <Card className="h-full transition-all hover:bg-secondary">
            <div className="flex h-full items-center">
              <CardHeader>
                <CardTitle>Currency </CardTitle>
                <CardDescription>
                  Configure how things are displayed
                </CardDescription>
              </CardHeader>
              <div className="grow"></div>
              <DollarSign className="flex-shrink-0" />
              <div className="px-4"></div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
