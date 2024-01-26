import { createLazyFileRoute } from "@tanstack/react-router";

import { Announcement } from "@/components/announcement";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="container">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading className="">
          Joyful personal finance management for everyone.
        </PageHeaderHeading>
        <PageHeaderDescription>
          Free forever, open source, and easy to use.
        </PageHeaderDescription>
        <PageActions>
          <div className="flex gap-2">
            <Input placeholder="Enter your email" />
            <Button>Join the waitlist :)</Button>
          </div>
        </PageActions>
      </PageHeader>
    </div>
  );
}
