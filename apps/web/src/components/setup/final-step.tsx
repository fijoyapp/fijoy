import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, type TypeOf } from "zod";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { CurrencyStepData, GoalStepData } from "@/types/setup";
import { Icons } from "../icons";
import { useSetupStore } from "@/store/setup";
import { useShallow } from "zustand/shallow";
import { useEffect, useRef } from "react";
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import { finalStepMutation } from "./__generated__/finalStepMutation.graphql";
import { environment } from "@/environment";

const formSchema = z.object({
  currency: CurrencyStepData,
  goal: GoalStepData,
});

const profileCreateMutation = graphql`
  mutation finalStepMutation(
    $currencies: String!
    $netWorthGoal: String!
    $locale: String!
  ) {
    createProfile(
      input: {
        currencies: $currencies
        netWorthGoal: $netWorthGoal
        locale: $locale
        userID: "" # will be set by the server
      }
    ) {
      id
    }
  }
`;

const FinalStep = () => {
  const router = useRouter();
  const [commitMutation, isMutationInFlight] = useMutation<finalStepMutation>(
    profileCreateMutation,
  );

  const { currencyStepData, goalStepData, reset } = useSetupStore(
    useShallow((state) => ({
      currencyStepData: state.currencyStepData,
      goalStepData: state.goalStepData,
      reset: state.reset,
    })),
  );

  const form = useForm<TypeOf<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: currencyStepData,
      goal: goalStepData,
    },
  });

  async function onSubmit() {
    if (isMutationInFlight) {
      return;
    }

    if (!(await form.trigger())) {
      router.navigate({
        to: "/setup",
        search: { step: "currency" },
      });
      return;
    }

    const values = form.getValues();

    toast.promise(
      new Promise((resolve, reject) => {
        resolve("");
        commitMutation({
          variables: {
            currencies: values.currency.currencies.join(","),
            netWorthGoal: values.goal.net_worth_goal,
            locale: "en-CA", // TODO: Replace with actual locale value
          },
          onCompleted: (response) => {
            resolve(response);
          },
          onError: (error) => reject(error),
        });
      }),
      {
        success: async () => {
          reset();
          await router.invalidate({
            sync: true,
          });

          return "Profile created";
        },
        loading: "Creating profile...",
        error: (e: Error) => `Error creating profile: ${e.toString()}`,
      },
    );

    router.navigate({
      to: "/home",
      // reloadDocument: true, // FIXME: this is temporary fix
    });
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
