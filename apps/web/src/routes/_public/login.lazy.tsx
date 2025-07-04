import { Icons } from "@/components/icons";
import TermsAndPrivacy from "@/components/terms-and-privacy";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Computer } from "lucide-react";

export const Route = createLazyFileRoute("/_public/login")({
  component: Login,
});

function Login() {
  return (
    <div className="container mx-auto max-w-(--breakpoint-2xl)">
      <div className="py-4"></div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log in to your account
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          {!import.meta.env.PROD && (
            <Button asChild>
              <a
                href={env.VITE_SERVER_URL + "/v1/auth/local/login"}
                className="flex gap-2"
              >
                <Computer className="h-4 w-4" />
                Local Sandbox
              </a>
            </Button>
          )}
          <Button asChild>
            <a
              href={env.VITE_SERVER_URL + "/v1/auth/google/login"}
              className="flex gap-2"
            >
              <Icons.google className="h-4 w-4" />
              Continue with Google
            </a>
          </Button>
        </div>

        <TermsAndPrivacy />
      </div>

      <div className="py-4"></div>
    </div>
  );
}
