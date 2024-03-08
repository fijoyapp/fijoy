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
import { useRouter } from "@tanstack/react-router";
import { NameNamespaceStepData } from "@/types/setup";
import { useSetupStore } from "@/store/setup";

const formSchema = NameNamespaceStepData;

const NameNamespaceStep = () => {
  const router = useRouter();

  const { generalStepData, setGeneralStepData } = useSetupStore((state) => ({
    generalStepData: state.nameNamespaceStepData,
    setGeneralStepData: state.setNameNamespaceStepData,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: generalStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setGeneralStepData(values);
    router.navigate({
      from: "/setup",
      search: { step: "currency-locale" },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                This is your workspace&apos;s visible name within Fijoy.
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
        <Button className="w-full" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default NameNamespaceStep;
