import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type TypeOf } from "zod";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@connectrpc/connect-query";
import { createWorkspace } from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { CurrencyLocaleStepData, NameNamespaceStepData } from "@/types/setup";
import { Icons } from "../icons";
import { useSetupStore } from "@/store/setup";
import { useEffect, useRef } from "react";

const formSchema = NameNamespaceStepData.merge(CurrencyLocaleStepData);

const FinalStep = () => {
  const router = useRouter();

  const { generalStepData, currencyStepData, reset } = useSetupStore(
    (state) => ({
      generalStepData: state.nameNamespaceStepData,
      currencyStepData: state.currencyLocaleStepData,
      reset: state.reset,
    }),
  );

  const form = useForm<TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...generalStepData,
      ...currencyStepData,
    },
  });

  const createWorkspaceMut = useMutation(createWorkspace, {
    onSuccess: (data) => {
      router.navigate({
        to: "/workspace/$namespace",
        params: {
          namespace: data.namespace,
        },
      });
    },
  });

  async function onSubmit() {
    if (!(await form.trigger())) {
      router.navigate({
        to: "/setup",
        search: { step: "name-namespace" },
      });
      return;
    }

    const values = form.getValues();
    toast.promise(
      createWorkspaceMut.mutateAsync({
        name: values.name,
        namespace: values.namespace,
        primaryCurrency: values.primaryCurrency,
        supportedCurrencies: values.supportedCurrencies,
        locale: values.locale,
      }),
      {
        success: () => {
          reset();
          return "Workspace created";
        },
        loading: "Creating workspace...",
        error: (e: Error) => `Error creating workspace: ${e.toString()}`,
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
