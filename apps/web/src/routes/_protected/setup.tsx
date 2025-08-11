import { createFileRoute, Link } from "@tanstack/react-router";
import invariant from "tiny-invariant";

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
import { useFragment } from "react-relay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { profilesFragment$key } from "@/lib/queries/__generated__/profilesFragment.graphql";
import { ProfilesFragment } from "@/lib/queries/profiles";
import { setProfile } from "@/lib/profile";
import { useData } from "@/hooks/use-data";

const setupSearchSchema = z.object({
  step: SetupStep.optional(),
});

export const Route = createFileRoute("/_protected/setup")({
  validateSearch: (search) => {
    return setupSearchSchema.parse(search);
  },
  component: Setup,
});

function Setup() {
  const { step } = Route.useSearch();

  return step ? <SetupProfile step={step} /> : <ProfilePicker />;
}

function SetupProfile({ step }: { step: SetupStep }) {
  const { data } = useData();

  return (
    <div className="container mx-auto max-w-(--breakpoint-2xl)">
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

function ProfilePicker() {
  const { data } = useData();

  const profiles = useFragment<profilesFragment$key>(
    ProfilesFragment,
    data.profiles,
  );

  invariant(profiles);

  return (
    <div className="container mx-auto max-w-(--breakpoint-2xl)">
      <PageHeader>
        <PageHeaderHeading className="">Welcome back!</PageHeaderHeading>
        <PageHeaderDescription>
          Pick a profile or create a new one to continue.
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto max-w-lg">
        <Button asChild>
          <Link to={"/setup"} search={{ step: "currency" }}>
            Create a new profile
          </Link>
        </Button>

        <div className="py-2"></div>

        <div className="flex-col space-y-2">
          {profiles.map((profile) => (
            <Card key={profile.id}>
              <CardContent className="flex py-4">
                <div>{profile.name}</div>
                <div className="grow"></div>
                <Button
                  size="icon"
                  variant="default"
                  onClick={() => {
                    setProfile(profile.id);
                  }}
                >
                  <ArrowRight />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
