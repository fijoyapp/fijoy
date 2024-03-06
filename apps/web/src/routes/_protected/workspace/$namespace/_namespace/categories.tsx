import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/categories",
)({
  component: Page,
});

// function CategoryColumn({
//   categories,
//   name,
// }: {
//   categories: Category[];
//   name: string;
// }) {
//   return (
//     <div className="">
//       <div className="text-lg font-bold leading-tight tracking-tighter md:text-2xl lg:px-4 lg:leading-tight">
//         {name}
//       </div>
//       <div className="py-1" />
//       <Separator />
//       <div className="py-2" />
//
//       <div className="flex flex-wrap gap-2 px-4">
//         {categories.map((c) => (
//           <CategoryButton key={c.id} category={c} />
//         ))}
//       </div>
//
//       <div className="py-2" />
//     </div>
//   );
// }

// function CategoryButton({ category }: { category: Category }) {
//   return (
//     <Popover>
//       <PopoverTrigger>
//         <Button variant="secondary">{category.name}</Button>
//       </PopoverTrigger>
//       <PopoverContent asChild className="w-fit px-2 py-1">
//         <div className="flex items-center space-x-2 text-sm">
//           <button>Rename</button>
//           <Separator orientation="vertical" className="h-4" />
//           <button className="text-destructive">Delete</button>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }

function Page() {
  // const { workspace } = Route.useRouteContext();
  //
  // const { data: categories } = useSuspenseQuery(
  //   categoriesQueryOptions(workspace.id),
  // );
  //
  // const isDesktop = useMediaQuery("(min-width: 1024px)");
  //
  // return (
  //   <div className="container max-w-screen-2xl">
  //     <PageHeader>
  //       <PageHeaderHeading className="">Categories</PageHeaderHeading>
  //       <PageHeaderDescription className="">
  //         Manage all your transaction categories.
  //       </PageHeaderDescription>
  //     </PageHeader>
  //
  //     <div className="py-2 lg:py-4" />
  //
  //     <NewCategory workspace={workspace} />
  //     <div className="py-2" />
  //
  //     {isDesktop ? (
  //       <ResizablePanelGroup
  //         direction="horizontal"
  //         autoSaveId="categories-resizable"
  //       >
  //         <ResizablePanel minSize={12}>
  //           <CategoryColumn
  //             name="Expense"
  //             categories={categories.filter(
  //               (c) => c.CategoryType === "expense",
  //             )}
  //           />
  //         </ResizablePanel>
  //         <ResizableHandle withHandle />
  //
  //         <ResizablePanel minSize={12}>
  //           <CategoryColumn
  //             name="Income"
  //             categories={categories.filter((c) => c.CategoryType === "income")}
  //           />
  //         </ResizablePanel>
  //         <ResizableHandle withHandle />
  //         <ResizablePanel minSize={12}>
  //           <CategoryColumn
  //             name="Transfer"
  //             categories={categories.filter(
  //               (c) => c.CategoryType === "transfer",
  //             )}
  //           />
  //         </ResizablePanel>
  //       </ResizablePanelGroup>
  //     ) : (
  //       <>
  //         <CategoryColumn
  //           name="Expense"
  //           categories={categories.filter((c) => c.CategoryType === "expense")}
  //         />
  //
  //         <CategoryColumn
  //           name="Income"
  //           categories={categories.filter((c) => c.CategoryType === "income")}
  //         />
  //         <CategoryColumn
  //           name="Transfer"
  //           categories={categories.filter((c) => c.CategoryType === "transfer")}
  //         />
  //       </>
  //     )}
  //
  //     <div className="py-2 lg:py-4" />
  //   </div>
  // );
}
