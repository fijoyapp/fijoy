import { Link, createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Settings } from "lucide-react";

export const Route = createFileRoute("/_protected/_profile/settings/")({
  component: Page,
});

function Page() {
  return (
    <div className="">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link from={Route.fullPath} to={"/settings/general"}>
          <Card className="hover:bg-secondary h-full transition-all">
            <div className="flex h-full items-center">
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>
                  General settings for your profile
                </CardDescription>
              </CardHeader>
              <div className="grow"></div>
              <Settings className="shrink-0" />
              <div className="px-4"></div>
            </div>
          </Card>
        </Link>
        <Link from={Route.fullPath} to={"/settings/currency"}>
          <Card className="hover:bg-secondary h-full transition-all">
            <div className="flex h-full items-center">
              <CardHeader>
                <CardTitle>Currency</CardTitle>
                <CardDescription>
                  Configure how things are displayed
                </CardDescription>
              </CardHeader>
              <div className="grow"></div>
              <DollarSign className="shrink-0" />
              <div className="px-4"></div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
