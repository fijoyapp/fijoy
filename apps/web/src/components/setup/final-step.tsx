import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useRouter } from "@tanstack/react-router";
import { CurrencyStepData, GoalStepData } from "@/types/setup";
import { useSetupStore } from "@/store/setup";
import { useShallow } from "zustand/shallow";
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import type { finalStepMutation } from "./__generated__/finalStepMutation.graphql";
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
      name
      netWorthGoal
      locale
      currencies
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

// eslint-disable-next-line no-empty-pattern
const FinalStep = ({}: Props) => {
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

  const form = useForm<z.infer<typeof formSchema>>({
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
          reset();
          router.navigate({
            to: "/home",
            reloadDocument: true, // NOTE: temporary fix, should patch store instead
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
