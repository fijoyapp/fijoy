import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  deleteWorkspace,
  getWorkspaceByNamespace,
  updateWorkspaceName,
  updateWorkspaceNamespace,
} from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { getWorkspaceHeader } from "@/lib/headers";
import { useWorkspace } from "@/hooks/use-workspace";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/settings/general/",
)({
  component: Page,
});

const workspaceNameFormSchema = z.object({ name: z.string() });
const workspaceUrlFormSchema = z.object({ namespace: z.string() });

function Page() {
  const { workspace } = useWorkspace();
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  const workspaceNameForm = useForm<z.infer<typeof workspaceNameFormSchema>>({
    resolver: zodResolver(workspaceNameFormSchema),
  });

  const updateWorkspaceNameMutation = useMutation(updateWorkspaceName, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey(getWorkspaceByNamespace, {
          namespace: workspace.namespace,
        }),
      });
      toast.success("Workspace name updated");
    },
    callOptions: {
      headers: getWorkspaceHeader(workspace.id),
    },
  });

  function onUpdateWorkspaceNameSubmit(
    values: z.infer<typeof workspaceNameFormSchema>,
  ) {
    return updateWorkspaceNameMutation.mutateAsync(values);
  }

  const workspaceUrlForm = useForm<z.infer<typeof workspaceUrlFormSchema>>({
    resolver: zodResolver(workspaceUrlFormSchema),
  });

  const updateWorkspaceNamespaceMutation = useMutation(
    updateWorkspaceNamespace,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: createConnectQueryKey(getWorkspaceByNamespace, {
            namespace: workspace.namespace,
          }),
        });
        router.navigate({
          to: "/workspace/$namespace/settings/general",
          params: {
            namespace: data.namespace,
          },
        });
        toast.success("Workspace URL updated");
      },
      callOptions: {
        headers: getWorkspaceHeader(workspace.id),
      },
    },
  );

  function onUpdateWorkspaceUrlSubmit(
    values: z.infer<typeof workspaceUrlFormSchema>,
  ) {
    return updateWorkspaceNamespaceMutation.mutateAsync(values);
  }

  const deleteWorkspaceMutation = useMutation(deleteWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.navigate({
        to: "/workspace/",
      });
      toast.success("Workspace deleted");
    },
    callOptions: {
      headers: getWorkspaceHeader(workspace.id),
    },
  });

  function onDeleteWorkspaceSubmit() {
    return deleteWorkspaceMutation.mutateAsync({});
  }

  return (
    <div className="max-w-2xl">
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
              General
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-sm text-muted-foreground">
        Manage your general workspace settings
      </p>

      <div className="py-4"></div>

      <div className="space-y-4">
        <Form {...workspaceNameForm}>
          <form
            onSubmit={workspaceNameForm.handleSubmit(
              onUpdateWorkspaceNameSubmit,
            )}
            className="space-y-8"
          >
            <FormField
              control={workspaceNameForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Workspace Name</CardTitle>
                      <CardDescription>
                        This is your workspace&apos;s visible name within Fijoy.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormControl>
                        <Input
                          placeholder={workspace.name}
                          {...field}
                          data-1p-ignore
                        />
                      </FormControl>
                    </CardContent>
                    <CardFooter className="space-x-4 border-t px-6 py-4">
                      {workspaceNameForm.formState.isSubmitting ? (
                        <Button disabled={true}>
                          <Icons.spinner />
                        </Button>
                      ) : (
                        <Button>Save</Button>
                      )}
                      <FormMessage />
                    </CardFooter>
                  </Card>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Form {...workspaceUrlForm}>
          <form
            onSubmit={workspaceUrlForm.handleSubmit(onUpdateWorkspaceUrlSubmit)}
            className="space-y-8"
          >
            <FormField
              control={workspaceUrlForm.control}
              name="namespace"
              render={({ field }) => (
                <FormItem>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Workspace URL</CardTitle>
                      <CardDescription>
                        This is your workspace’s URL namespace on Fijoy.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormControl>
                        <div className="flex gap-1.5">
                          <div className="flex h-10 w-min rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground opacity-50 ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            fijoy.app/workspace/
                          </div>
                          <Input placeholder={workspace.namespace} {...field} />
                        </div>
                      </FormControl>
                    </CardContent>
                    <CardFooter className="space-x-4 border-t px-6 py-4">
                      {workspaceUrlForm.formState.isSubmitting ? (
                        <Button disabled={true}>
                          <Icons.spinner />
                        </Button>
                      ) : (
                        <Button>Save</Button>
                      )}
                      <FormMessage />
                    </CardFooter>
                  </Card>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-xl">Delete Workspace</CardTitle>
            <CardDescription>
              This will permanently delete your workspace and all its data.
            </CardDescription>
          </CardHeader>
          <CardFooter className="space-x-4 border-t px-6 py-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your workspace and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDeleteWorkspaceSubmit}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
