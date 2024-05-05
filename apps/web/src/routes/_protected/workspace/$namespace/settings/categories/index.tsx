import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import invariant from "tiny-invariant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Accordion } from "@/components/ui/accordion";
import { Trash } from "lucide-react";
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
import { z } from "zod";
import { getCategoriesQueryOptions } from "@/lib/queries/category";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { TransactionType } from "@/gen/proto/fijoy/v1/transaction_pb";
import _ from "lodash";
import {
  createCategories,
  getCategories,
} from "@/gen/proto/fijoy/v1/category-CategoryService_connectquery";
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { getWorkspaceHeader } from "@/lib/headers";
import { useWorkspace } from "@/hooks/use-workspace";
import { toast } from "sonner";
import { TransactionTypeEnum } from "@/types/transaction";
import { tsTransactionTypeToProto } from "@/lib/convert";
import { CategoryList } from "@/components/settings/categories/category-list";
import { useRef } from "react";

const settingsCategoriesSchema = z.object({
  category: TransactionTypeEnum.default("expense").optional(),
  "add-category": z.boolean().default(false).optional(),
});

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/settings/categories/",
)({
  validateSearch: (search) => {
    return settingsCategoriesSchema.parse(search);
  },

  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getCategoriesQueryOptions({ context }));
  },
  component: Page,
});

function Page() {
  const { "add-category": addCategoryOpen, category } = Route.useSearch();
  const router = useRouter();

  const context = Route.useRouteContext();

  const categories = useSuspenseQuery(getCategoriesQueryOptions({ context }));

  const expenseCategories = categories.data.categories
    .filter((c) => c.categoryType === TransactionType.EXPENSE)
    .sort((a, b) => (a.position < b.position ? -1 : 1));

  const incomeCategories = categories.data.categories
    .filter((c) => c.categoryType === TransactionType.INCOME)
    .sort((a, b) => (a.position < b.position ? -1 : 1));

  const transferCategories = categories.data.categories
    .filter((c) => c.categoryType === TransactionType.TRANSFER)
    .sort((a, b) => (a.position < b.position ? -1 : 1));

  function onNewCategory(category: TransactionTypeEnum) {
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
        className="gap-4 space-y-4 md:flex md:flex-wrap md:items-start md:space-y-0"
      >
        <CategoryList
          categories={expenseCategories}
          categoryType="expense"
          onAddNewCategory={onNewCategory}
        />

        <CategoryList
          categories={incomeCategories}
          categoryType="income"
          onAddNewCategory={onNewCategory}
        />

        <CategoryList
          categories={transferCategories}
          categoryType="transfer"
          onAddNewCategory={onNewCategory}
        />
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
  category: TransactionTypeEnum;
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
            <DialogTitle>New {_.capitalize(category)} Category</DialogTitle>
            <DialogDescription>
              Add a new transaction category
            </DialogDescription>
          </DialogHeader>
          <CategoryForm category={category} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top">
        <SheetHeader className="text-left">
          <SheetTitle>New {_.capitalize(category)} Category</SheetTitle>
          <SheetDescription>Add a new transaction category</SheetDescription>
        </SheetHeader>
        <CategoryForm category={category} />
      </SheetContent>
    </Sheet>
  );
}

const formSchema = z.object({
  categories: z.object({ name: z.string().min(1) }).array(),
});

type formSchema = z.infer<typeof formSchema>;

function CategoryForm({ category }: { category: TransactionTypeEnum }) {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "categories",
    control: form.control,
  });
  const queryClient = useQueryClient();
  const { workspace } = useWorkspace();
  const router = useRouter();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const addCategories = useMutation(createCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey(getCategories),
      });
      form.reset({
        categories: [{ name: "" }],
      });
      router.navigate({
        from: Route.fullPath,
        to: ".",
        search: { "add-category": false, category },
      });
    },
    callOptions: {
      headers: getWorkspaceHeader(workspace.id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      addCategories.mutateAsync({
        categories: _.uniq(values.categories.map((category) => category.name)),
        categoryType: tsTransactionTypeToProto(category),
      }),
      {
        success: "Success!",
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`categories.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        invariant(submitButtonRef.current);
                        submitButtonRef.current.click();
                      }
                    }}
                  >
                    <Input
                      placeholder={`${category} category name`}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    onClick={() => remove(index)}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex">
          <Button onClick={() => append({ name: "" })} variant="secondary">
            Add more
          </Button>
          <span className="grow"></span>

          <Button type="submit" ref={submitButtonRef}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
