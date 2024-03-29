import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "@tanstack/react-router";
import { useAccountsStore } from "@/store/accounts";
import { NameStepData } from "@/types/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = NameStepData;

const NameStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  const { nameStepData, setNameStepData } = useAccountsStore((state) => ({
    nameStepData: state.nameStepData,
    setNameStepData: state.setNameStepData,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: nameStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setNameStepData(values);
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "type" },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <div>Let's get your account setup! How should we call it?</div>
              <FormControl>
                <Input
                  className="w-64"
                  placeholder="e.g. BMO Student Mastercard"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="grow"></div>
              <Button type="submit">Next</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default NameStep;
