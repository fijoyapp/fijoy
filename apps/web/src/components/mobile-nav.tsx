import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useMatchRoute, useParams } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useAuth } from "@/auth";
import UserButton from "./user-button";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  const matchRoute = useMatchRoute();

  const inWorkspace = matchRoute({
    to: "/workspace/$namespace",
    fuzzy: true,
  });

  const params = useParams({ from: "/_protected/workspace/$namespace" });
  const scope = params.namespace;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <div className="py-2" />

        <nav className="flex flex-1 items-center gap-2">
          {user ? (
            <UserButton />
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button size="sm" variant="secondary">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>

        {inWorkspace && scope && (
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              <Link
                to={"/workspace/$namespace"}
                params={{ namespace: scope }}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  matchRoute({ to: "/workspace/$namespace" })
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to={"/workspace/$namespace/transactions"}
                params={{ namespace: scope }}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  matchRoute({ to: "/workspace/$namespace/transactions" })
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
                onClick={() => setOpen(false)}
              >
                Transactions
              </Link>
              <Link
                to={"/workspace/$namespace/accounts"}
                params={{ namespace: scope }}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  matchRoute({ to: "/workspace/$namespace/accounts" })
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
                onClick={() => setOpen(false)}
              >
                Accounts
              </Link>

              <Link
                to={"/workspace/$namespace/categories"}
                params={{ namespace: scope }}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  matchRoute({ to: "/workspace/$namespace/categories" })
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
                onClick={() => setOpen(false)}
              >
                Categories
              </Link>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
