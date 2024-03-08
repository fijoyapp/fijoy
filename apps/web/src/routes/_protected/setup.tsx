import { createFileRoute } from "@tanstack/react-router";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SetupStep } from "@/types/setup";
import { z } from "zod";
import GeneralStep from "@/components/setup/general-step";
import CurrencyStep from "@/components/setup/currency-step";
import FinalStep from "@/components/setup/final-step";

const setupSearchSchema = z.object({
  step: SetupStep.default("general"),
});

export const Route = createFileRoute("/_protected/setup")({
  validateSearch: (search) => {
    return setupSearchSchema.parse(search);
  },
  component: Setup,
});

function Setup() {
  const { step } = Route.useSearch();
  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Welcome to Fijoy</PageHeaderHeading>
        <PageHeaderDescription>
          Let&apos;s get you set up with a new workspace.
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto max-w-lg">
        {step === "general" && <GeneralStep />}
        {step === "currency" && <CurrencyStep />}
        {step === "final" && <FinalStep />}
      </div>
    </div>
  );
}
