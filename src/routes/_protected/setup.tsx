import { createFileRoute } from "@tanstack/react-router";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CreateWorkspace from "@/components/setup/create-workspace";
import { useUser } from "@/auth";

export const Route = createFileRoute("/_protected/setup")({
  component: Setup,
});

function Setup() {
  const { user } = useUser();
  console.log("user", user);
  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Welcome to Fijoy</PageHeaderHeading>
        <PageHeaderDescription>
          Let&apos;s get you set up with a new workspace.
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto max-w-lg">
        <CreateWorkspace />
      </div>
    </div>
  );
}
