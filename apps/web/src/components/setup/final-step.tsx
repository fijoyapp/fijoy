import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, type TypeOf } from "zod";
import { toast } from "sonner";
import { Link, useRouter } from "@tanstack/react-router";
import { CurrencyStepData, GoalStepData } from "@/types/setup";
import { Icons } from "../icons";
import { useSetupStore } from "@/store/setup";
import { useShallow } from "zustand/shallow";
import { useCallback, useEffect, useRef } from "react";
import { fetchQuery, graphql } from "relay-runtime";
import {
  type PreloadedQuery,
  useMutation,
  useQueryLoader,
  useRelayEnvironment,
} from "react-relay";
import type { finalStepMutation } from "./__generated__/finalStepMutation.graphql";
import { rootQuery } from "@/routes/__root";
import type { RootQuery } from "@/routes/__generated__/RootQuery.graphql";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { NameField } from "@/routes/_protected/_profile/-components/accounts/form/name";

const formSchema = z.object({
  currency: CurrencyStepData,
  goal: GoalStepData,
  name: z.string(),
});

const profileCreateMutation = graphql`
  mutation finalStepMutation(
    $currencies: [String!]!
    $netWorthGoal: String!
    $name: String!
  ) {
    createProfile(
      input: {
        currencies: $currencies
        netWorthGoal: $netWorthGoal
        name: $name
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
            name: values.name,
            currencies: values.currency.currencies,
            netWorthGoal: values.goal.net_worth_goal,
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <NameField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Give your profile a name"
          />

          <div className="flex-col space-x-2">
            <Button
              type="submit"
              className="col-span-2"
              disabled={isMutationInFlight}
            >
              Create
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

export default FinalStep;
