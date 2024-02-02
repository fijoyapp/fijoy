import { Icons } from "@/components/icons";
import TermsAndPrivacy from "@/components/terms-and-privacy";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/signup")({
  component: Signup,
});

function Signup() {
  return (
    <div className="container max-w-screen-2xl">
      <div className="py-4"></div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <Button asChild>
            <a
              href={env.VITE_BACKEND_URL + "/auth/google/login"}
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
