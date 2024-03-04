import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import { Icons } from "./icons";
import { Link, useMatchRoute, useParams } from "@tanstack/react-router";
import { ArrowLeftRight, CreditCard, Home } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
// import { Button, buttonVariants } from "./ui/button";
import { Button } from "./ui/button";
// import { useAuth } from "@/auth";
import UserButton from "./user-button";

const PrivateSidebar = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const matchRoute = useMatchRoute();

  const inWorkspace = matchRoute({
    to: "/workspace/$namespace",
    fuzzy: true,
  });

  const params = useParams({ from: "/_protected/workspace/$namespace" });
  const scope = params.namespace;

  return (
    <div ref={ref} className={cn("flex flex-col p-4", className)} {...props}>
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-8 w-8" />
        <span className="hidden text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <div className="py-2"></div>

      {inWorkspace && scope && (
        <>
          <Button
            variant="outline"
            className="rounded-xl hover:border-primary hover:bg-background"
          >
            New Transaction
          </Button>

          <div className="py-2"></div>

          <nav className="flex flex-col gap-6 text-sm font-bold">
            <Link
              to={"/workspace/$namespace"}
              params={{ namespace: scope }}
              className={cn(
                "flex items-center gap-2 transition-colors hover:text-foreground/80",
                matchRoute({ to: "/workspace/$namespace" })
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              <Home size="20" />
              Home
            </Link>
            <Link
              to={"/workspace/$namespace/transactions"}
              params={{ namespace: scope }}
              className={cn(
                "flex items-center gap-2 transition-colors hover:text-foreground/80",
                matchRoute({ to: "/workspace/$namespace/transactions" })
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              <ArrowLeftRight size={20} />
              Transactions
            </Link>
            <Link
              to={"/workspace/$namespace/accounts"}
              params={{ namespace: scope }}
              className={cn(
                "flex items-center gap-2 transition-colors hover:text-foreground/80",
                matchRoute({ to: "/workspace/$namespace/accounts" })
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              <CreditCard size="20" />
              Accounts
            </Link>

            {/* <Link */}
            {/*   to={"/workspace/$namespace/categories"} */}
            {/*   params={{ namespace: scope }} */}
            {/*   className={cn( */}
            {/*     "transition-colors hover:text-foreground/80", */}
            {/*     matchRoute({ to: "/workspace/$namespace/categories" }) */}
            {/*       ? "text-foreground" */}
            {/*       : "text-foreground/60", */}
            {/*   )} */}
            {/* > */}
            {/*   Categories */}
            {/* </Link> */}

            {/* <LinkComponent */}
            {/*   to={"/workspace/$namespace/categories"} */}
            {/*   params={{ namespace: scope }} */}
            {/*   highlight={matchRoute({ to: "/workspace/$namespace/transactions" })} */}
            {/*   name={"Categories"} */}
            {/* /> */}
          </nav>
        </>
      )}

      <div className="grow"></div>

      <UserButton />

      {/* <div className="flex"> */}
      {/*   <a href={siteConfig.links.github} target="_blank" rel="noreferrer"> */}
      {/*     <div */}
      {/*       className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} */}
      {/*     > */}
      {/*       <Icons.gitHub className="h-[1.2rem] w-[1.2rem]" /> */}
      {/*       <span className="sr-only">GitHub</span> */}
      {/*     </div> */}
      {/*   </a> */}
      {/*   <a href={siteConfig.links.discord} target="_blank" rel="noreferrer"> */}
      {/*     <div */}
      {/*       className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} */}
      {/*     > */}
      {/*       <Icons.discord className="h-[1.2rem] w-[1.2rem]" /> */}
      {/*       <span className="sr-only">Discord</span> */}
      {/*     </div> */}
      {/*   </a> */}
      {/**/}
      {/*   <div className="grow"></div> */}
      {/**/}
      {/*   <ModeToggle /> */}
      {/* </div> */}
    </div>
  );
});

export default PrivateSidebar;
