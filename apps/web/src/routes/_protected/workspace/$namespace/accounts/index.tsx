import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { NewAccountStep } from "@/types/accounts";
import { z } from "zod";
import { AccountTable } from "@/components/accounts/account-table";
import { columns } from "@/components/accounts/columns";
import { getAccountsQueryOptions } from "@/lib/queries/account";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import CenterLoadingSpinner from "@/components/center-loading-spinner";
import { match } from "ts-pattern";
import NameTypeInstitutionStep from "@/components/accounts/form-step/name-type-institution-step";
import CurrencyBalanceStep from "@/components/accounts/form-step/currency-balance-step";
import FinalStep from "@/components/accounts/form-step/final-step";
import { AccountStats } from "@/components/accounts/account-stats";

const setupNewAccountSchema = z.object({
  step: NewAccountStep.default("name-type-institution").optional(),
  "add-account": z.boolean().default(false).optional(),
});

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/accounts/",
)({
  // loaderDeps: ({ search}) => ({ search }),
  validateSearch: (search) => {
    return setupNewAccountSchema.parse(search);
  },
  loader: (opts) => {
    opts.context.queryClient.ensureQueryData(
      getAccountsQueryOptions({
        context: opts.context,
      }),
    );
  },
  pendingComponent: CenterLoadingSpinner,
  component: Page,
});

function Page() {
  const context = Route.useRouteContext();
  const accountsQuery = useSuspenseQuery(getAccountsQueryOptions({ context }));
  const accounts = accountsQuery.data.accounts;
  const { step, "add-account": addAccountOpen } = Route.useSearch();

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Accounts</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage your accounts
        </PageHeaderDescription>
      </PageHeader>

      <AccountStats accounts={accounts} />

      {/* FIXME: table is too wide on mobile */}
      <AccountTable columns={columns} data={accounts}>
        <AddAccount
          open={addAccountOpen ?? false}
          step={step ?? "name-type-institution"}
        />
      </AccountTable>
    </>
  );
}

function AddAccount({ open, step }: { open: boolean; step: NewAccountStep }) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const router = useRouter();

  function onOpenChange(open: boolean) {
    router.navigate({
      from: Route.fullPath,
      to: "/workspace/$namespace/accounts",
      search: { "add-account": open, step },
    });
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default">New Account</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Account</DialogTitle>
            <DialogDescription>
              Start tracking your account in Fijoy :)
            </DialogDescription>
          </DialogHeader>
          <AccountForm step={step} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="default" className="">
          New
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader className="text-left">
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Start tracking your account in Fijoy :)
          </SheetDescription>
        </SheetHeader>
        <AccountForm step={step} />
      </SheetContent>
    </Sheet>
  );
}

function AccountForm({
  className,
  step,
}: React.ComponentProps<"form"> & { step: NewAccountStep }) {
  return (
    <>
      {match(step)
        .with("name-type-institution", () => (
          <NameTypeInstitutionStep className={className} />
        ))
        .with("currency-balance", () => (
          <CurrencyBalanceStep className={className} />
        ))
        .with("final", () => <FinalStep className={className} />)
        .exhaustive()}
    </>
  );
}
