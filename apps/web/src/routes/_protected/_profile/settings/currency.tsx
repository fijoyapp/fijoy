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
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import { CurrencyField } from "@/components/setup/form/currency";
import { graphql, useMutation, usePreloadedQuery } from "react-relay";
import { useProfile } from "@/hooks/use-profile";
import { rootQuery } from "@/routes/__root";
import { currencyMutation } from "./__generated__/currencyMutation.graphql";

export const Route = createFileRoute("/_protected/_profile/settings/currency")({
  component: Page,
});

const currencyFormSchema = z.object({
  currencies: z.string().array(),
});

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const CurrencyMutation = graphql`
  mutation currencyMutation($id: ID!, $currencies: String!) {
    updateProfile(id: $id, input: { currencies: $currencies }) {
      ...profileFragment
    }
  }
`;

function Page() {
  const { rootQueryRef } = Route.useRouteContext();
  const { profile } = useProfile();

  const [commitMutation, isMutationInFlight] =
    useMutation<currencyMutation>(CurrencyMutation);

  const data = usePreloadedQuery(rootQuery, rootQueryRef);

  const form = useForm<TypeOf<typeof currencyFormSchema>>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues: {
      currencies: profile.currencies.split(","),
    },
  });

  function onUpdateCurrencySubmit(values: TypeOf<typeof currencyFormSchema>) {
    commitMutation({
      variables: {
        id: profile.id,
        currencies: values.currencies.join(","),
      },
      onCompleted(_, errors) {
        if (errors && errors.length > 0) {
          toast.error(errors.map((error) => error.message).join(", "));
        } else {
          toast.success("Currency settings updated");
        }
      },
    });
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
                  defaultValues={profile.currencies.split(",")}
                  onValueChange={(value) => {
                    form.setValue("currencies", value);
                  }}
                />
              </CardContent>
              <CardFooter className="space-x-4 border-t px-6 py-4">
                <AnimatePresence mode="wait" initial={false}>
                  <Button
                    disabled={form.formState.isSubmitting || isMutationInFlight}
                    className="w-16"
                  >
                    {form.formState.isSubmitting || isMutationInFlight ? (
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
