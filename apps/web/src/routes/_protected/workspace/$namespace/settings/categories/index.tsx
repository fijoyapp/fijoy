import { Link, createFileRoute } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeftRight, PiggyBank, Receipt } from "lucide-react";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/settings/categories/",
)({
  component: Page,
});

function Page() {
  return (
    <div className="">
      <Breadcrumb>
        <BreadcrumbList className="text-lg font-semibold text-muted-foreground md:text-2xl">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link from={Route.fullPath} to={".."}>
                Settings
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-foreground">
              Categories
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-sm text-muted-foreground">
        Tweak your transaction categories
      </p>

      <Accordion
        type="multiple"
        defaultValue={["expense", "income", "transfer"]}
        className="items-start lg:flex lg:space-x-8"
      >
        <AccordionItem value="expense" className="lg:w-64">
          <AccordionTrigger>
            <Receipt className="h-4 w-4 !transform-none" />
            Expense Categories
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="income" className="lg:w-64">
          <AccordionTrigger>
            <PiggyBank className="h-4 w-4 !transform-none" />
            Income Categories
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="transfer" className="lg:w-64">
          <AccordionTrigger>
            <ArrowLeftRight className="h-4 w-4 !transform-none" />
            Transfer Categories
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
