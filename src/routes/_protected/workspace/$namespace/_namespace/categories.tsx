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
import axios from "axios";
import { env } from "@/env";
import { SelectCategory } from "@/types/category";
import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/categories/data-table";
import { categoriesQueryOptions } from "@/lib/queries/category";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/categories",
)({
  beforeLoad: async ({ context }) => {
    const queryOpts = queryOptions({
      queryKey: ["category"],
      queryFn: async () => {
        const res = await axios.get(env.VITE_BACKEND_URL + `/category`, {
          withCredentials: true,
          params: {
            workspace_id: context.workspace.ID,
          },
        });
        return SelectCategory.array().parse(res.data);
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

function Page() {
  const { workspace } = Route.useRouteContext();

  const { data: categories } = useSuspenseQuery(
    categoriesQueryOptions(workspace.ID),
  );

  // const [tab, setTab] = useState<(typeof transactionTypes)[number]>("expense");

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

      <DataTable columns={columns} data={categories} />

      {/* <span className="px-2" /> */}

      {/* <Tabs */}
      {/*   defaultValue={tab} */}
      {/*   onValueChange={(val) => */}
      {/*     setTab(val as (typeof transactionTypes)[number]) */}
      {/*   } */}
      {/*   className="" */}
      {/* > */}
      {/*   <TabsList> */}
      {/*     <TabsTrigger value="expense">Expense</TabsTrigger> */}
      {/*     <TabsTrigger value="income">Income</TabsTrigger> */}
      {/*     <TabsTrigger value="transfer">Transfer</TabsTrigger> */}
      {/*   </TabsList> */}
      {/*   <TabsContent value="expense"> */}
      {/*   </TabsContent> */}
      {/*   <TabsContent value="income"> */}
      {/*     <DataTable */}
      {/*       columns={columns} */}
      {/*       data={categories.filter((c) => c.CategoryType === "income")} */}
      {/*     /> */}
      {/*   </TabsContent> */}
      {/*   <TabsContent value="transfer"> */}
      {/*     <DataTable */}
      {/*       columns={columns} */}
      {/*       data={categories.filter((c) => c.CategoryType === "transfer")} */}
      {/*     /> */}
      {/*   </TabsContent> */}
      {/* </Tabs> */}

      <div className="py-2 lg:py-4" />
    </div>
  );
}
