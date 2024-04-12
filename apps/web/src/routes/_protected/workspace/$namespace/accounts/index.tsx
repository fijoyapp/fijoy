import { createFileRoute, useRouter } from "@tanstack/react-router";

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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
import BalanceStep from "@/components/accounts/form-step/balance-step";
import FinalStep from "@/components/accounts/form-step/final-step";

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

      <AddAccount
        open={addAccountOpen ?? false}
        step={step ?? "name-type-institution"}
      />

      <AccountTable columns={columns} data={accounts} />
    </>
  );
}

function AddAccount({ open, step }: { open: boolean; step: NewAccountStep }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
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
          <Button variant="outline">Add Account</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Account</DialogTitle>
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
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Account</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Account</DrawerTitle>
          <DrawerDescription>
            Start tracking your account in Fijoy :)
          </DrawerDescription>
        </DrawerHeader>
        <AccountForm className="px-4" step={step} />
        <DrawerFooter className="pt-2">
          {/* <DrawerClose asChild> */}
          {/*   <Button variant="outline">Cancel</Button> */}
          {/* </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
        .with("balance", () => <BalanceStep className={className} />)
        .with("final", () => <FinalStep className={className} />)
        .exhaustive()}
    </>
  );
}
