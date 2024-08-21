import { Link, createFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { z, type TypeOf } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormMessage } from "@/components/ui/form";
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { getProfileHeader } from "@/lib/headers";
import {
  getProfile,
  updateCurrency,
} from "@/gen/proto/fijoy/v1/profile-ProfileService_connectquery";
import { AnimatePresence, motion } from "framer-motion";
import { CurrencyField } from "@/components/setup/form/currency";
import { getCurrenciesQueryOptions } from "@/lib/queries/currency";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_protected/_profile/settings/currency/")(
  {
    component: Page,
    loader: (opts) => {
      opts.context.queryClient.ensureQueryData(
        getCurrenciesQueryOptions({
          context: opts.context,
        }),
      );
    },
  },
);

const currencyFormSchema = z.object({
  currencies: z.string().array(),
});

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

function Page() {
  const { queryClient, profile } = Route.useRouteContext();

  const form = useForm<TypeOf<typeof currencyFormSchema>>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues: {
      currencies: profile.currencies,
    },
  });

  const context = Route.useRouteContext();

  const { data: currencies } = useSuspenseQuery(
    getCurrenciesQueryOptions({
      context,
    }),
  );

  const updateCurrencyMutation = useMutation(updateCurrency, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey(getProfile),
      });
      toast.success("Currency settings updated");
    },
    onError(error) {
      toast.error(error.message);
    },
    callOptions: {
      headers: getProfileHeader(profile.id),
    },
  });

  function onUpdateCurrencySubmit(values: TypeOf<typeof currencyFormSchema>) {
    return updateCurrencyMutation.mutateAsync(values);
  }

  return (
    <div className="max-w-xl">
      <Breadcrumb>
        <BreadcrumbList className="text-lg font-semibold text-muted-foreground md:text-2xl">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link from={Route.fullPath} to={".."}>
                Settings
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-foreground">
              Currency
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-sm text-muted-foreground">
        Everything related to multi-currency settings.
      </p>

      <div className="py-4"></div>

      <div className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onUpdateCurrencySubmit)}
            className="space-y-8"
          >
            <Card>
              <div className="py-3"></div>

              <CardContent>
                <CurrencyField
                  control={form.control}
                  name="currencies"
                  currencies={currencies}
                  defaultValues={profile.currencies}
                  onValueChange={(value) => {
                    form.setValue("currencies", value);
                  }}
                />
              </CardContent>
              <CardFooter className="space-x-4 border-t px-6 py-4">
                <AnimatePresence mode="wait" initial={false}>
                  <Button
                    disabled={form.formState.isSubmitting}
                    className="w-16"
                  >
                    {form.formState.isSubmitting ? (
                      <motion.span
                        key="checkmark"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <Icons.spinner />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        Save
                      </motion.span>
                    )}
                  </Button>
                </AnimatePresence>
                <FormMessage />
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
