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
import {
  getProfile,
  updateProfile,
} from "@/gen/proto/fijoy/v1/profile-ProfileService_connectquery";
import { AnimatePresence, motion } from "framer-motion";
import { CurrencyField } from "@/components/setup/form/currency";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { currencyQuery } from "./__generated__/currencyQuery.graphql";

const CurrencyQuery = graphql`
  query currencyQuery {
    currencies {
      ...currencyFragment
    }
  }
`;

export const Route = createFileRoute("/_protected/_profile/settings/currency/")(
  {
    component: Page,
    // loader: (opts) => {
    //   opts.context.queryClient.ensureQueryData(
    //     getCurrenciesQueryOptions({
    //       context: opts.context,
    //     }),
    //   );
    // },
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

  const data = useLazyLoadQuery<currencyQuery>(CurrencyQuery, {});

  const form = useForm<TypeOf<typeof currencyFormSchema>>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues: {
      currencies: profile.profile.currencies.split(","),
    },
  });

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey({
          schema: getProfile,
          cardinality: "finite",
        }),
      });
      toast.success("Currency settings updated");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function onUpdateCurrencySubmit(values: TypeOf<typeof currencyFormSchema>) {
    return updateProfileMutation.mutateAsync(values);
  }

  return (
    <div className="max-w-xl p-4 lg:p-6">
      <Breadcrumb>
        <BreadcrumbList className="text-muted-foreground text-lg font-semibold md:text-2xl">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link from={Route.fullPath} to={".."}>
                Settings
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-semibold">
              Currency
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-muted-foreground text-sm">
        Everything related to multi-currency settings.
      </p>

      <div className="py-2"></div>

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
                  currencies={data.currencies}
                  defaultValues={profile.profile.currencies.split(",")}
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
