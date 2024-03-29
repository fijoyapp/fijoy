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
import { InstitutionStepData } from "@/types/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = InstitutionStepData;

const InstitutionStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  const { institutionStepData, setInstitutionStepData } = useAccountsStore(
    (state) => ({
      institutionStepData: state.institutionStepData,
      setInstitutionStepData: state.setInstitutionStepData,
    }),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: institutionStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setInstitutionStepData(values);
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "balance" },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <div>Which institution issued this account?</div>
              <FormControl>
                <Input
                  className="w-64"
                  placeholder="e.g. American Express"
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

export default InstitutionStep;
