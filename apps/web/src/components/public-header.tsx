import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { PublicNav } from "@/components/public-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
// import { useAuth } from "@/hooks/use-auth";

export function PublicHeader() {
  // const { user } = useAuth();
  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-14 max-w-(--breakpoint-2xl) items-center">
        <PublicNav />
        <nav className="flex flex-1 items-center justify-end gap-2">
          {/* {user ? ( */}
          {/*   <Link to={"/home"}> */}
          {/*     <Button size="sm" variant="outline"> */}
          {/*       My Account */}
          {/*     </Button> */}
          {/*   </Link> */}
          {/* ) : ( */}
          <>
            <Link to="/login">
              <Button size="sm" variant="secondary">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </>
          {/* )} */}

          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </a>
          <a href={siteConfig.links.discord} target="_blank" rel="noreferrer">
            <div
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
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
