"use client";

import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function WorkspaceNav() {
  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const scope = segments[2];

  const onReservedScope = segments[1] !== "workspace";

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      {/* FIXME: Link for react router */}
      {!onReservedScope && scope && (
        <nav className="flex items-center gap-6 text-sm">
          <Link
            to={"/workspace/$namespace"}
            params={{ namespace: scope }}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === `/workspace/${scope}`
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Dashboard
          </Link>
          <Link
            to={"/workspace/$namespace/transactions"}
            params={{ namespace: scope }}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === `/workspace/${scope}/transactions`
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Transactions
          </Link>
          <Link
            to={"/workspace/$namespace/accounts"}
            params={{ namespace: scope }}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === `/workspace/${scope}/accounts`
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Accounts
          </Link>
        </nav>
      )}
    </div>
  );
}
