import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@connectrpc/connect-query";
import { createWorkspace } from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";

const formSchema = z.object({
  Name: z.string(),
  Namespace: z.string(),
});

const CreateWorkspace = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const createWorkspaceMut = useMutation(createWorkspace, {
    onSuccess: (data) => {
      router.navigate({
        to: "/workspace/$namespace",
        params: {
          namespace: data.namespace,
        },
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(
      createWorkspaceMut.mutateAsync({
        name: values.Name,
        namespace: values.Namespace,
      }),
      {
        success: "Workspace created",
        loading: "Creating workspace...",
        error: (e: Error) => `Error creating workspace: ${e.toString()}`,
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Joey's Personal Space"
                  {...field}
                  data-1p-ignore
                />
              </FormControl>
              <FormDescription>
                This is your workspace&apos;s visible name within Fijoy
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Namespace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace URL</FormLabel>
              <FormControl>
                <div className="flex gap-1.5">
                  <div className="flex h-10 w-min rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground opacity-50 ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    fijoy.app/workspace/
                  </div>
                  <Input placeholder="joey" className="" {...field} />
                </div>
              </FormControl>
              <FormDescription>
                This is your workspace’s URL namespace on Fijoy.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateWorkspace;
