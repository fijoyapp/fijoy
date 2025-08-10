import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link, useRouter } from "@tanstack/react-router";
import { CurrencyStepData } from "@/types/setup";
import { useSetupStore } from "@/store/setup";
import { useShallow } from "zustand/shallow";
import { CurrencyField } from "./form/currency";
import type { currencyFragment$key } from "@/lib/queries/__generated__/currencyFragment.graphql";
import type z from "zod";

const formSchema = CurrencyStepData;

type CurrencyStepProps = {
  currencies: currencyFragment$key;
};

const CurrencyStep = ({ currencies }: CurrencyStepProps) => {
  const router = useRouter();

  const { currencyStepData, setCurrencyStepData } = useSetupStore(
    useShallow((state) => ({
      currencyStepData: state.currencyStepData,
      setCurrencyStepData: state.setCurrencyStepData,
    })),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currencyStepData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrencyStepData(values);
    router.navigate({
      from: "/setup",
      to: "/setup",
      search: { step: "goal" },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CurrencyField
            control={form.control}
            name="currencies"
            currencies={currencies}
            onValueChange={(value) => {
              form.setValue("currencies", value);
            }}
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

export default CurrencyStep;
