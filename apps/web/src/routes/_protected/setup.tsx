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
import GoalStep from "@/components/setup/goal-step";
import { usePreloadedQuery } from "react-relay";
import { routeProtectedQuery } from "./__generated__/routeProtectedQuery.graphql";
import { RouteProtectedQuery } from "./route";

const setupSearchSchema = z.object({
  step: SetupStep.default("currency"),
});

export const Route = createFileRoute("/_protected/setup")({
  validateSearch: (search) => {
    return setupSearchSchema.parse(search);
  },
  component: Setup,
});

function Setup() {
  const { step } = Route.useSearch();

  const { protectedQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<routeProtectedQuery>(
    RouteProtectedQuery,
    protectedQueryRef,
  );

  return (
    <div className="container max-w-(--breakpoint-2xl)">
      <PageHeader>
        <PageHeaderHeading className="">Welcome to Fijoy</PageHeaderHeading>
        <PageHeaderDescription>
          Let&apos;s setup your profile.
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto max-w-lg">
        {match(step)
          .with("currency", () => <CurrencyStep currencies={data.currencies} />)
          .with("goal", () => <GoalStep currencies={data.currencies} />)
          .with("final", () => <FinalStep />)
          .exhaustive()}
      </div>
    </div>
  );
}
