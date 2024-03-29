import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "@tanstack/react-router";
import { useAccountsStore } from "@/store/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AccountTypeEnum, TypeStepData } from "@/types/accounts";

const formSchema = TypeStepData;

const TypeStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  const { typeStepData, setTypeStepData } = useAccountsStore((state) => ({
    typeStepData: state.typeStepData,
    setTypeStepData: state.setTypeStepData,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: typeStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTypeStepData(values);
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "institution" },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <div>What type of account is this?</div>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={"Select type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {AccountTypeEnum.options.map((o) => (
                      <SelectItem value={o} key={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default TypeStep;
