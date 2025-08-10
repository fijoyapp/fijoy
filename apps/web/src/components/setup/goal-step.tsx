import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link, Navigate, useRouter } from "@tanstack/react-router";
import { GoalStepData } from "@/types/setup";
import { useSetupStore } from "@/store/setup";
import { useShallow } from "zustand/shallow";
import { MoneyField } from "./form/money";
import type { currencyFragment$key } from "@/lib/queries/__generated__/currencyFragment.graphql";
import { CurrencyFragment } from "@/lib/queries/currency";
import { useFragment } from "react-relay";
import type z from "zod";

const formSchema = GoalStepData;

type GoalStepProps = {
  currencies: currencyFragment$key;
};

const GoalStep = ({ currencies }: GoalStepProps) => {
  const router = useRouter();

  const { currencyStepData, goalStepData, setGoalStepData } = useSetupStore(
    useShallow((state) => ({
      goalStepData: state.goalStepData,
      setGoalStepData: state.setGoalStepData,
      currencyStepData: state.currencyStepData,
    })),
  );

  const data = useFragment(CurrencyFragment, currencies);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: goalStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setGoalStepData(values);
    router.navigate({
      from: "/setup",
      to: "/setup",
      search: { step: "final" },
    });
  }

  if (!currencyStepData) {
    return <Navigate to="/setup" search={{ step: "currency" }} />;
  }

  const locale = data.find(
    (currency) => currency.code === currencyStepData.currencies[0],
  )!.locale;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MoneyField
            control={form.control}
            name="net_worth_goal"
            label="Net Worth Goal"
            currency={currencyStepData.currencies[0]}
            locale={locale}
            onValueChange={(value) => form.setValue("net_worth_goal", value)}
          />

          <div className="flex-col space-x-2">
            <Button type="submit" className="col-span-2">
              Next
            </Button>
            <Button
              type="button"
              className="col-span-2"
              variant={"secondary"}
              asChild
            >
              <Link to="/setup">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default GoalStep;
