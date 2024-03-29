import Balance from "react-wrap-balancer";

import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("flex flex-col", className)} {...props}>
      {children}
    </section>
  );
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-lg font-semibold md:text-2xl", className)}
      {...props}
    />
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription };
