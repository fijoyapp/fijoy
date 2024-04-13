import { Icons } from "@/components/icons";
import {
  createAccount,
  getAccounts,
} from "@/gen/proto/fijoy/v1/account-AccountService_connectquery";
import { cn } from "@/lib/utils";
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { ComponentProps, useEffect, useRef } from "react";

import { useAccountsStore } from "@/store/accounts";
import { useRouter } from "@tanstack/react-router";
import { useWorkspace } from "@/hooks/use-workspace";
import { tsAccountTypeToProto } from "@/lib/convert";
import { getWorkspaceHeader } from "@/lib/headers";
import { useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "@/gen/proto/fijoy/v1/transaction-TransactionService_connectquery";
import { toast } from "sonner";

const FinalStep = ({ className }: ComponentProps<"div">) => {
  const { workspace } = useWorkspace();
  const createAccountMutation = useMutation(createAccount, {
    callOptions: {
      headers: getWorkspaceHeader(workspace.id),
    },
  });

  const { nameTypeInstitutionStepData, balanceStepData, reset } =
    useAccountsStore((state) => ({
      nameTypeInstitutionStepData: state.nameTypeInstitutionStepData,
      balanceStepData: state.balanceStepData,
      reset: state.reset,
    }));
  const router = useRouter();
  const queryClient = useQueryClient();

  // this makes sure that the mutation only fires once in strict mode
  const hasFired = useRef(false);

  async function create() {
    if (!nameTypeInstitutionStepData) {
      router.navigate({
        to: "/workspace/$namespace/accounts",
        search: { step: "name-type-institution", "add-account": true },
        params: { namespace: workspace.namespace },
      });

      return;
    }

    await createAccountMutation.mutateAsync({
      name: nameTypeInstitutionStepData.name,
      accountType: tsAccountTypeToProto(nameTypeInstitutionStepData.type),
      institution: nameTypeInstitutionStepData.institution,
      // TODO: do not hard code
      currency: "CAD",
    });

    // TODO: add transaction
    console.log(balanceStepData);

    hasFired.current = true;

    reset();

    queryClient.invalidateQueries({
      queryKey: createConnectQueryKey(getAccounts),
    });

    queryClient.invalidateQueries({
      queryKey: createConnectQueryKey(getTransactions),
    });

    toast.success("Account created");

    router.navigate({
      to: "/workspace/$namespace/accounts",
      search: { "add-account": false, step: "final" },
      params: { namespace: workspace.namespace },
    });
  }

  useEffect(() => {
    if (hasFired.current) return;

    create();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-2">
        <Icons.spinner />
        Creating your account...
      </div>
    </div>
  );
};

export default FinalStep;