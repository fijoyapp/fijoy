import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { PublicNav } from "@/components/public-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <PublicNav />
        <nav className="flex flex-1 items-center justify-end gap-2">
          <Link to="/login">
            <Button size="sm" variant="secondary">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(buttonVariants({ variant: "ghost" }), "w-9 px-0")}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </a>
          <a href={siteConfig.links.discord} target="_blank" rel="noreferrer">
            <div
              className={cn(buttonVariants({ variant: "ghost" }), "w-9 px-0")}
            >
              <Icons.discord className="h-4 w-4" />
              <span className="sr-only">Discord</span>
            </div>
          </a>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
