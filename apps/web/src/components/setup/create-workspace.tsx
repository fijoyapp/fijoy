import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRENCIES, currencyCodeToName } from "@/config/currency";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  primaryCurrency: z.string(),
});

type Stage = "workspace" | "currency";

const CreateWorkspace = () => {
  const router = useRouter();

  const [currentStage, setCurrentStage] = useState<Stage>("workspace");

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
        name: values.name,
        namespace: values.namespace,
        primaryCurrency: values.primaryCurrency,
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
        {currentStage === "workspace" && (
          <>
            <FormField
              control={form.control}
              name="name"
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
              name="namespace"
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
            <Button
              className="w-full"
              onClick={async () => {
                if (await form.trigger(["name", "namespace"])) {
                  setCurrentStage("currency");
                }
              }}
            >
              Continue
            </Button>
          </>
        )}

        {currentStage === "currency" && (
          <>
            <FormField
              control={form.control}
              name="primaryCurrency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Currency</FormLabel>
                  <FormControl>
                    <div>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? `${currencyCodeToName(field.value)} (${field.value})`
                              : "Select currency"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[360px] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search currency..." />
                            <CommandList>
                              <CommandEmpty>No currency found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea>
                                  {CURRENCIES.map((currency) => (
                                    <CommandItem
                                      value={currency}
                                      key={`${currencyCodeToName(currency)} (${currency})`}
                                      onSelect={() => {
                                        form.setValue(
                                          "primaryCurrency",
                                          currency,
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          currency === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {`${currencyCodeToName(currency)} (${currency})`}
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Statistics like net worth etc. will be shown in this
                    currency
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <Button
                className="col-span-1"
                variant="secondary"
                onClick={() => setCurrentStage("workspace")}
              >
                Back
              </Button>
              <Button type="submit" className="col-span-2">
                Create
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default CreateWorkspace;
