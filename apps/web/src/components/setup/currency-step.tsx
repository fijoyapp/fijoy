import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "@tanstack/react-router";
import { CurrencyStepData } from "@/types/setup";
import { useSetupStore } from "@/store/setup";
import { type TypeOf } from "zod";
import { CurrencyField } from "./form/currency";
import { Currency } from "@/gen/proto/fijoy/v1/currency_pb";

const formSchema = CurrencyStepData;

type CurrencyStepProps = {
  currencies: Currency[];
};

const CurrencyStep = ({ currencies }: CurrencyStepProps) => {
  const router = useRouter();

  const { currencyStepData, setCurrencyStepData } = useSetupStore((state) => ({
    currencyStepData: state.currencyStepData,
    setCurrencyStepData: state.setCurrencyStepData,
  }));

  const form = useForm<TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currencyStepData,
  });

  function onSubmit(values: TypeOf<typeof formSchema>) {
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

          <Button type="submit" className="col-span-2">
            Next
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CurrencyStep;
