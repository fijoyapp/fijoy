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
import { useFragment, usePreloadedQuery } from "react-relay";
import { rootQuery } from "../__root";
import type { RootQuery } from "../__generated__/RootQuery.graphql";
import { Button } from "@/components/ui/button";
import { ProfileFragment } from "@/lib/queries/profile";
import type { profileFragment$key } from "@/lib/queries/__generated__/profileFragment.graphql";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useCallback } from "react";
import { env } from "@/env";
import { toast } from "sonner";

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
  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

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
          .with("final", () => <FinalStep rootQueryRef={rootQueryRef} />)
          .exhaustive()}
      </div>
    </div>
  );
}

function ProfilePicker() {
  const { rootQueryRef } = Route.useRouteContext();

  const data = usePreloadedQuery<RootQuery>(rootQuery, rootQueryRef);

  const profiles = useFragment<profileFragment$key>(
    ProfileFragment,
    data.profiles,
  );

  const setProfile = useCallback(async (profileID: string) => {
    const response = await fetch(env.VITE_SERVER_URL + "/v1/auth/set-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `profile_id=${encodeURIComponent(profileID)}`,
      credentials: "include",
      redirect: "manual",
    });

    if (response.type === "opaqueredirect" || response.status === 302) {
      window.location.href = "/home";
    } else {
      toast.error("Failed to load profile, please try again!");
    }
  }, []);

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

        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardContent className="flex py-4">
              <div>{profile.id}</div>
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
  );
}
