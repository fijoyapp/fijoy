import NewCategory from "@/components/categories/new-category";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { createFileRoute } from "@tanstack/react-router";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useState } from "react";
// import { transactionTypes } from "@/config/transaction";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SelectCategory } from "@/types/category";
import { categoriesQueryOptions } from "@/lib/queries/category";
import { Separator } from "@/components/ui/separator";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { api } from "@/lib/ky";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/categories",
)({
  beforeLoad: async ({ context }) => {
    const queryOpts = queryOptions({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await api
          .get(`categories`, {
            searchParams: {
              workspace_id: context.workspace.id,
            },
          })
          .json();
        return SelectCategory.array().parse(res);
      },
    });
    await context.queryClient.ensureQueryData(queryOpts);
    const categories = context.queryClient.getQueryData(queryOpts.queryKey);
    if (!categories) {
      throw new Error("Category not found");
    }
    return { categories };
  },
  component: Page,
});

function CategoryColumn({
  categories,
  name,
}: {
  categories: SelectCategory[];
  name: string;
}) {
  return (
    <div className="">
      <div className="text-lg font-bold leading-tight tracking-tighter md:text-2xl lg:px-4 lg:leading-tight">
        {name}
      </div>
      <div className="py-1" />
      <Separator />
      <div className="py-2" />

      <div className="flex flex-wrap gap-2 lg:px-4">
        {categories.map((c) => (
          <CategoryButton key={c.ID} category={c} />
        ))}
      </div>

      <div className="py-2" />
    </div>
  );
}

function CategoryButton({ category }: { category: SelectCategory }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary">{category.Name}</Button>
      </PopoverTrigger>
      <PopoverContent asChild className="w-fit px-2 py-1">
        <div className="flex items-center space-x-2 text-sm">
          <button>Rename</button>
          <Separator orientation="vertical" className="h-4" />
          <button className="text-destructive">Delete</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Page() {
  const { workspace } = Route.useRouteContext();

  const { data: categories } = useSuspenseQuery(
    categoriesQueryOptions(workspace.id),
  );

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Categories</PageHeaderHeading>
        <PageHeaderDescription className="">
          Manage all your transaction categories.
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2 lg:py-4" />

      <NewCategory workspace={workspace} />
      <div className="py-2" />

      {isDesktop ? (
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="categories-resizable"
        >
          <ResizablePanel minSize={12}>
            <CategoryColumn
              name="Expense"
              categories={categories.filter(
                (c) => c.CategoryType === "expense",
              )}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel minSize={12}>
            <CategoryColumn
              name="Income"
              categories={categories.filter((c) => c.CategoryType === "income")}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={12}>
            <CategoryColumn
              name="Transfer"
              categories={categories.filter(
                (c) => c.CategoryType === "transfer",
              )}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>
          <CategoryColumn
            name="Expense"
            categories={categories.filter((c) => c.CategoryType === "expense")}
          />

          <CategoryColumn
            name="Income"
            categories={categories.filter((c) => c.CategoryType === "income")}
          />
          <CategoryColumn
            name="Transfer"
            categories={categories.filter((c) => c.CategoryType === "transfer")}
          />
        </>
      )}

      <div className="py-2 lg:py-4" />
    </div>
  );
}
