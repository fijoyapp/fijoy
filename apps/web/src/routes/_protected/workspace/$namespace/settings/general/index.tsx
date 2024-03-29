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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/workspace";
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
  getWorkspaceByNamespace,
  updateWorkspaceName,
  updateWorkspaceNamespace,
} from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { getWorkspaceHeader } from "@/lib/headers";

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

  function onWorkspaceNameSubmit(
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

  function onWorkspaceUrlSubmit(
    values: z.infer<typeof workspaceUrlFormSchema>,
  ) {
    return updateWorkspaceNamespaceMutation.mutateAsync(values);
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList className="text-lg font-semibold text-muted-foreground md:text-2xl">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" asChild>
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
            onSubmit={workspaceNameForm.handleSubmit(onWorkspaceNameSubmit)}
            className="space-y-8"
          >
            <FormField
              control={workspaceNameForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>Workspace Name</CardTitle>
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
                          <Icons.spinner className="animate-spin" />
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
            onSubmit={workspaceUrlForm.handleSubmit(onWorkspaceUrlSubmit)}
            className="space-y-8"
          >
            <FormField
              control={workspaceUrlForm.control}
              name="namespace"
              render={({ field }) => (
                <FormItem>
                  <Card>
                    <CardHeader>
                      <CardTitle>Workspace URL</CardTitle>
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
                          <Icons.spinner className="animate-spin" />
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
      </div>
    </div>
  );
}
