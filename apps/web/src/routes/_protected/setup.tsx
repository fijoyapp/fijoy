import { createFileRoute } from "@tanstack/react-router";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SetupStep } from "@/types/setup";
import { z } from "zod";
import NameNamespaceStep from "@/components/setup/name-namespace-step";
import CurrencyLocaleStep from "@/components/setup/currency-locale-step";
import FinalStep from "@/components/setup/final-step";

const setupSearchSchema = z.object({
  step: SetupStep.default("name-namespace"),
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
        {step === "name-namespace" && <NameNamespaceStep />}
        {step === "currency-locale" && <CurrencyLocaleStep />}
        {step === "final" && <FinalStep />}
      </div>
    </div>
  );
}
