import { transactionTypes } from "@/config/transaction";
import { SelectWorkspace } from "@/types/workspace";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InsertCategory } from "@/types/category";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { env } from "@/env";
import { queryClient } from "@/main";
import { categoriesQueryOptions } from "@/lib/queries/category";
import { useState } from "react";

type Props = {
  workspace: SelectWorkspace;
};

const formSchema = InsertCategory;

const NewCategory = ({ workspace }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [open, setOpen] = useState(false);

  const insertCategory = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axios.post(env.VITE_BACKEND_URL + "/category", data, {
        withCredentials: true,
        params: {
          workspace_id: workspace.ID,
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryOptions(workspace.ID).queryKey,
      });
      setOpen(false);
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(insertCategory.mutateAsync(data), {
      success: "Category created!",
      loading: "Creating category...",
      error: "Something went wrong :(",
    });
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button size="sm">Add category</Button>
      </DialogTrigger>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
          id="create-category"
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New category</DialogTitle>
              <DialogDescription>
                A category is a way to group your transactions. <br /> For
                example, you might have an expense category called "Grocery" for
                all your grocery. Or an income category called "Salary" for all
                your paycheck.
              </DialogDescription>

              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Grocery" {...field} data-1p-ignore />
                    </FormControl>
                    <FormDescription>
                      Give your category a name that describes it best.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CategoryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionTypes.map((type) => (
                          <SelectItem value={type} key={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This can be either an expense, income, or transfer.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" form="create-category">
                Create
              </Button>
            </DialogHeader>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default NewCategory;
