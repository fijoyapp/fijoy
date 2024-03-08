import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { useMutation } from "@connectrpc/connect-query";
import { createWorkspace } from "@/gen/proto/fijoy/v1/workspace-WorkspaceService_connectquery";
import { CurrencyStepData, GeneralStepData } from "@/types/setup";
import { Icons } from "../icons";
import { useSetupStore } from "@/store/setup";
import { useEffect } from "react";

const formSchema = GeneralStepData.merge(CurrencyStepData);

const FinalStep = () => {
  const router = useRouter();

  const { generalStepData, currencyStepData, reset } = useSetupStore(
    (state) => ({
      generalStepData: state.generalStepData,
      currencyStepData: state.currencyStepData,
      reset: state.reset,
    }),
  );

  const form = useForm<z.infer<typeof formSchema>>({
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
        search: { step: "general" },
      });
      return;
    }

    const values = form.getValues();
    toast.promise(
      createWorkspaceMut.mutateAsync({
        name: values.name,
        namespace: values.namespace,
        primaryCurrency: values.primaryCurrency,
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

  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center gap-2">
      <Icons.spinner className="animate-spin" />
      <div>Working on it...</div>
    </div>
  );
};

export default FinalStep;
