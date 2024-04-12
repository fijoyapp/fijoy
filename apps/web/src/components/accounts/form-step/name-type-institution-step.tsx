import { AccountTypeEnum } from "@/types/accounts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useWorkspace } from "@/hooks/use-workspace";
import { useRouter } from "@tanstack/react-router";
import { useAccountsStore } from "@/store/accounts";
import { NameTypeInstitutionStepData } from "@/types/accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { snakeToTitle } from "@/lib/format";

const formSchema = NameTypeInstitutionStepData;

const NameTypeInstitutionStep = ({ className }: ComponentProps<"form">) => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  const { nameTypeInstitutionStepData, setNameTypeInstitutionStepData } =
    useAccountsStore((state) => ({
      nameTypeInstitutionStepData: state.nameTypeInstitutionStepData,
      setNameTypeInstitutionStepData: state.setNameTypeInstitutionStepData,
    }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: nameTypeInstitutionStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setNameTypeInstitutionStepData(values);
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "balance", "add-account": true },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-2", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  data-1p-ignore
                  placeholder="e.g. BMO Student Mastercard"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed in Fijoy.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={"Select your account type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {AccountTypeEnum.options.map((o) => (
                      <SelectItem value={o} key={o}>
                        {snakeToTitle(o)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>What type of account is this?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input
                  data-1p-ignore
                  placeholder="e.g. American Express"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Which institution issued this account?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-2"></div>

        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};

export default NameTypeInstitutionStep;
