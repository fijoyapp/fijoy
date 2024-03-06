import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { Link } from "@tanstack/react-router";

export function PublicNav() {
  // const matchRoute = useMatchRoute();
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-2 text-sm">
        {/* <Link */}
        {/*   to={"/features"} */}
        {/*   className={cn( */}
        {/*     "flex items-center gap-2 rounded-xl p-2 transition-colors hover:text-foreground", */}
        {/*     matchRoute({ to: "/features" }) */}
        {/*       ? "text-foreground" */}
        {/*       : "text-foreground/60", */}
        {/*   )} */}
        {/* > */}
        {/*   Features */}
        {/* </Link> */}
        {/**/}
        {/* <Link */}
        {/*   to={"/pricing"} */}
        {/*   className={cn( */}
        {/*     "flex items-center gap-2 rounded-xl p-2 transition-colors hover:text-foreground", */}
        {/*     matchRoute({ to: "/pricing" }) */}
        {/*       ? "text-foreground" */}
        {/*       : "text-foreground/60", */}
        {/*   )} */}
        {/* > */}
        {/*   Pricing */}
        {/* </Link> */}
        {/**/}
        {/* <Link */}
        {/*   to={"/why"} */}
        {/*   className={cn( */}
        {/*     "flex items-center gap-2 rounded-xl p-2 transition-colors hover:text-foreground", */}
        {/*     matchRoute({ to: "/why" }) */}
        {/*       ? "text-foreground" */}
        {/*       : "text-foreground/60", */}
        {/*   )} */}
        {/* > */}
        {/*   Why Fijoy? */}
        {/* </Link> */}
        {/**/}
        {/* <Link */}
        {/*   to={"/stack"} */}
        {/*   className={cn( */}
        {/*     "flex items-center gap-2 rounded-xl p-2 transition-colors hover:text-foreground", */}
        {/*     matchRoute({ to: "/stack" }) */}
        {/*       ? "text-foreground" */}
        {/*       : "text-foreground/60", */}
        {/*   )} */}
        {/* > */}
        {/*   Stack */}
        {/* </Link> */}
      </nav>
    </div>
  );
}
