import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type TypeOf } from "zod";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@connectrpc/connect-query";
import { CurrencyLocaleStepData } from "@/types/setup";
import { Icons } from "../icons";
import { useSetupStore } from "@/store/setup";
import { useEffect, useRef } from "react";
import { createProfile } from "@/gen/proto/fijoy/v1/profile-ProfileService_connectquery";
import { useProfile } from "@/hooks/use-profile";

const formSchema = CurrencyLocaleStepData;

const FinalStep = () => {
  const router = useRouter();
  const { refresh } = useProfile();

  const { currencyLocaleStepData, reset } = useSetupStore((state) => ({
    currencyLocaleStepData: state.currencyLocaleStepData,
    reset: state.reset,
  }));

  const form = useForm<TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...currencyLocaleStepData,
    },
  });

  const createProfileMut = useMutation(createProfile, {
    onSuccess: async () => {
      refresh();
      // router.navigate({
      //   to: "/home",
      // });
    },
  });

  async function onSubmit() {
    if (!(await form.trigger())) {
      router.navigate({
        to: "/setup",
        search: { step: "currency-locale" },
      });
      return;
    }

    const values = form.getValues();
    toast.promise(
      createProfileMut.mutateAsync({
        primaryCurrency: values.primaryCurrency,
        supportedCurrencies: values.supportedCurrencies,
        locale: values.locale,
      }),
      {
        success: () => {
          reset();
          return "Profile created";
        },
        loading: "Creating profile...",
        error: (e: Error) => `Error creating profile: ${e.toString()}`,
      },
    );
  }

  // this makes sure that the mutation only fires once in strict mode
  const hasFired = useRef(false);
  useEffect(() => {
    if (hasFired.current) {
      return;
    }
    hasFired.current = true;
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center gap-2">
      <Icons.spinner />
      <div>Working on it...</div>
    </div>
  );
};

export default FinalStep;
