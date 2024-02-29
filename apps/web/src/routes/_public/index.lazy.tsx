import { createLazyFileRoute } from "@tanstack/react-router";

import { Announcement } from "@/components/announcement";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const Route = createLazyFileRoute("/_public/")({
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
            <a href={siteConfig.links.discord} target="_blank">
              <Button>Join the waitlist :)</Button>
            </a>
          </div>
        </PageActions>
      </PageHeader>
    </div>
  );
}
