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
import { rootQuery } from "../__root";
import { RootQuery } from "../__generated__/RootQuery.graphql";

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

  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

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
          .with("final", () => <FinalStep rootQueryRef={rootQueryRef} />)
          .exhaustive()}
      </div>
    </div>
  );
}
