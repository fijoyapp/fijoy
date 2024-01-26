import { ArrowRightIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function Announcement() {
  return (
    <a
      href="https://discord.gg/xcEs33PpTR"
      target="_blank"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />
      <span className="sm:hidden">Comming soon.</span>
      <span className="hidden sm:inline">
        Currently in development. Comming soon!
      </span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </a>
  );
}
