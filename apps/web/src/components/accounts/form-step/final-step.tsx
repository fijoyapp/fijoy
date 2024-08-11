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
import { useProfile } from "@/hooks/use-workspace";
import { tsAccountTypeToProto } from "@/lib/convert";
import { useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "@/gen/proto/fijoy/v1/transaction-TransactionService_connectquery";
import { toast } from "sonner";
import { getProfileHeader } from "@/lib/headers";

const FinalStep = ({ className }: ComponentProps<"div">) => {
  const { profile } = useProfile();
  const createAccountMutation = useMutation(createAccount, {
    callOptions: {
      headers: getProfileHeader(profile.id),
    },
  });

  const { nameTypeInstitutionStepData, currencyBalanceStepData, reset } =
    useAccountsStore((state) => ({
      nameTypeInstitutionStepData: state.nameTypeInstitutionStepData,
      currencyBalanceStepData: state.currencyBalanceStepData,
      reset: state.reset,
    }));
  const router = useRouter();
  const queryClient = useQueryClient();

  // this makes sure that the mutation only fires once in strict mode
  const hasFired = useRef(false);

  function stringToUnitsNanos(value: string): { units: bigint; nanos: number } {
    const [units, nanos] = value.split(".");
    return {
      units: BigInt(units),
      nanos: parseInt((nanos ?? "0").padEnd(9, "0")),
    };
  }

  async function create() {
    hasFired.current = true;
    if (!nameTypeInstitutionStepData || !currencyBalanceStepData) {
      router.navigate({
        to: "/accounts",
        search: { step: "name-type-institution", "add-account": true },
      });

      return;
    }

    const money = stringToUnitsNanos(currencyBalanceStepData.balance);

    await createAccountMutation.mutateAsync({
      name: nameTypeInstitutionStepData.name,
      accountType: tsAccountTypeToProto(nameTypeInstitutionStepData.type),
      institution: nameTypeInstitutionStepData.institution,
      balance: {
        currencyCode: currencyBalanceStepData.currencyCode,
        nanos: money.nanos,
        units: money.units,
      },
    });

    reset();

    queryClient.invalidateQueries({
      queryKey: createConnectQueryKey(getAccounts),
    });

    queryClient.invalidateQueries({
      queryKey: createConnectQueryKey(getTransactions),
    });

    toast.success("Account created");

    router.navigate({
      to: "/accounts",
      search: { "add-account": false, step: "final" },
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
