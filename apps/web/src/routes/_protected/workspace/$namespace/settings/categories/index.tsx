import { Link, createFileRoute, useRouter } from "@tanstack/react-router";

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
import { ArrowLeftRight, PiggyBank, Plus, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TypeOf, z } from "zod";

const categoryType = z.enum(["expense", "income", "transfer"]);

const settingsCategoriesSchema = z.object({
  category: categoryType.default("expense").optional(),
  "add-category": z.boolean().default(false).optional(),
});

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/settings/categories/",
)({
  validateSearch: (search) => {
    return settingsCategoriesSchema.parse(search);
  },

  component: Page,
});

function Page() {
  const { "add-category": addCategoryOpen, category } = Route.useSearch();
  const router = useRouter();

  function onNewCategory(category: TypeOf<typeof categoryType>) {
    router.navigate({
      from: Route.fullPath,
      to: ".",
      search: { "add-category": true, category },
    });
  }

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

      <div className="py-4"></div>

      <Accordion
        type="multiple"
        defaultValue={["expense", "income", "transfer"]}
        className="items-start gap-4 space-y-4 xl:flex xl:space-y-0"
      >
        <Card>
          <CardContent className="pb-0">
            <AccordionItem value="expense" className="border-none xl:w-64">
              <AccordionTrigger>
                <Receipt className="h-4 w-4 !transform-none" />
                Expense
              </AccordionTrigger>
              <AccordionContent>
                <Button
                  variant="secondary"
                  className="w-full gap-1"
                  onClick={() => onNewCategory("expense")}
                >
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pb-0">
            <AccordionItem value="income" className="border-none xl:w-64">
              <AccordionTrigger>
                <PiggyBank className="h-4 w-4 !transform-none" />
                Income
              </AccordionTrigger>
              <AccordionContent>
                <Button
                  variant="secondary"
                  className="w-full gap-1"
                  onClick={() => onNewCategory("income")}
                >
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pb-0">
            <AccordionItem value="transfer" className="border-none xl:w-64">
              <AccordionTrigger>
                <ArrowLeftRight className="h-4 w-4 !transform-none" />
                Transfer
              </AccordionTrigger>
              <AccordionContent>
                <Button
                  variant="secondary"
                  className="w-full gap-1"
                  onClick={() => onNewCategory("transfer")}
                >
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </AccordionContent>
            </AccordionItem>
          </CardContent>
        </Card>
      </Accordion>
      <AddCategory
        open={addCategoryOpen ?? false}
        category={category ?? "expense"}
      />
    </div>
  );
}

function AddCategory({
  open,
  category,
}: {
  open: boolean;
  category: TypeOf<typeof categoryType>;
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const router = useRouter();

  function onOpenChange(open: boolean) {
    router.navigate({
      from: Route.fullPath,
      to: ".",
      search: { "add-category": open, category },
    });
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
            <DialogDescription>
              Add a new transaction category
            </DialogDescription>
          </DialogHeader>
          {/* <AccountForm step={step} /> */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top">
        <SheetHeader className="text-left">
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Add a new transaction category</SheetDescription>
        </SheetHeader>
        {/* <AccountForm step={step} /> */}
      </SheetContent>
    </Sheet>
  );
}
