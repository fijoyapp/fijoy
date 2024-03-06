import { ArrowRightIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export function Announcement() {
  return (
    <a
      href={siteConfig.links.discord}
      target="_blank"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />
      <span className="sm:hidden">Coming soon.</span>
      <span className="hidden sm:inline">
        Currently in development. Coming soon!
      </span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </a>
  );
}
