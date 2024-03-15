import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/workspace";
import { useRouter } from "@tanstack/react-router";
import { useAccountsStore } from "@/store/accounts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { match } from "ts-pattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BalanceStepData } from "@/types/accounts";

const formSchema = BalanceStepData;

const BalanceStep = () => {
  const router = useRouter();
  const { workspace } = useWorkspace();

  const { nameStepData, typeStepData, balanceStepData, setBalanceStepData } =
    useAccountsStore((state) => ({
      nameStepData: state.nameStepData,
      typeStepData: state.typeStepData,
      balanceStepData: state.balanceStepData,
      setBalanceStepData: state.setBalanceStepData,
    }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: balanceStepData,
  });

  if (!typeStepData || !nameStepData) {
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "name" },
    });
    return null;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setBalanceStepData(values);
    router.navigate({
      to: "/workspace/$namespace/accounts",
      params: { namespace: workspace.namespace },
      search: { step: "final" },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              {match(typeStepData.type)
                .with("debt", () => (
                  <div>How much debt does this account carry?</div>
                ))
                .with("cash", () => (
                  <div>How much cash is in this account?</div>
                ))
                .with("investment", () => (
                  <div>What is the total value of the investment?</div>
                ))
                .with("other_asset", () => (
                  <div>What is the value of {nameStepData.name}?</div>
                ))
                .exhaustive()}
              <FormControl>
                {/* TODO: replace with currency input */}
                <Input
                  className="w-64"
                  type="number"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="grow"></div>
              <Button type="submit">Submit</Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default BalanceStep;
