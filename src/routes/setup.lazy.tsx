import { createLazyFileRoute } from "@tanstack/react-router";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import CreateWorkspace from "@/components/setup/create-workspace";

export const Route = createLazyFileRoute("/setup")({
  component: Setup,
});

function Setup() {
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
