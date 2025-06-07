import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, type TypeOf } from "zod";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { CurrencyStepData, GoalStepData } from "@/types/setup";
import { Icons } from "../icons";
import { useSetupStore } from "@/store/setup";
import { useShallow } from "zustand/shallow";
import { useCallback, useEffect, useRef } from "react";
import { fetchQuery, graphql } from "relay-runtime";
import {
  PreloadedQuery,
  useMutation,
  useQueryLoader,
  useRelayEnvironment,
} from "react-relay";
import { finalStepMutation } from "./__generated__/finalStepMutation.graphql";
import { rootQuery } from "@/routes/__root";
import { RootQuery } from "@/routes/__generated__/RootQuery.graphql";

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

type Props = {
  rootQueryRef: PreloadedQuery<RootQuery>;
};

const FinalStep = ({ rootQueryRef }: Props) => {
  const environment = useRelayEnvironment();
  const router = useRouter();
  const [commitMutation, isMutationInFlight] = useMutation<finalStepMutation>(
    profileCreateMutation,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, loadQuery] = useQueryLoader(
    rootQuery,
    rootQueryRef /* initial query ref */,
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

  const refresh = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // fetchQuery will fetch the query and write
      // the data to the Relay store. This will ensure
      // that when we re-render, the data is already
      // cached and we don't suspend
      fetchQuery<RootQuery>(environment, rootQuery, {
        hasProfile: true,
        hasUser: true,
      }).subscribe({
        complete: () => {
          // *After* the query has been fetched, we call
          // loadQuery again to re-render with a new
          // queryRef.
          // At this point the data for the query should
          // be cached, so we use the 'store-only'
          // fetchPolicy to avoid suspending.
          loadQuery(
            { hasProfile: true, hasUser: true },
            { fetchPolicy: "store-only" },
          );
          resolve();
        },
        error: (e: Error) => {
          reject(e);
        },
      });
    });
  }, [environment, loadQuery]);

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
          await refresh();
          reset();
          router.navigate({
            to: "/home",
          });

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
