"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { Link } from "@tanstack/react-router";

export function PublicNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm"></nav>
    </div>
  );
}
