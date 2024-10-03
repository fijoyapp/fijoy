import { createFileRoute } from "@tanstack/react-router";

import { match } from "ts-pattern";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SetupStep } from "@/types/setup";
import { z } from "zod";
import CurrencyStep from "@/components/setup/currency-step";
import FinalStep from "@/components/setup/final-step";
import { getCurrenciesQueryOptions } from "@/lib/queries/currency";
import { useSuspenseQuery } from "@tanstack/react-query";
import GoalStep from "@/components/setup/goal-step";

const setupSearchSchema = z.object({
  step: SetupStep.default("currency"),
});

export const Route = createFileRoute("/_protected/setup")({
  validateSearch: (search) => {
    return setupSearchSchema.parse(search);
  },

  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      getCurrenciesQueryOptions({
        context: opts.context,
      }),
    );
  },
  component: Setup,
});

function Setup() {
  const { step } = Route.useSearch();

  const context = Route.useRouteContext();

  const { data: currencyList } = useSuspenseQuery(
    getCurrenciesQueryOptions({
      context,
    }),
  );

  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Welcome to Fijoy</PageHeaderHeading>
        <PageHeaderDescription>
          Let&apos;s setup your profile.
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto max-w-lg">
        {match(step)
          .with("currency", () => (
            <CurrencyStep currencies={currencyList.items} />
          ))
          .with("goal", () => <GoalStep currencies={currencyList.items} />)
          .with("final", () => <FinalStep />)
          .exhaustive()}
      </div>
    </div>
  );
}
