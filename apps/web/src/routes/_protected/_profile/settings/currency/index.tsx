import { Link, createFileRoute } from "@tanstack/react-router";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createConnectQueryKey, useMutation } from "@connectrpc/connect-query";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { getProfileHeader } from "@/lib/headers";
import { cn } from "@/lib/utils";
import { CURRENCIES, currencyCodeToName } from "@/config/currency";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currencyToDisplay } from "@/lib/money";
import currency from "currency.js";
import { getUserLocales, localeCodeToName } from "@/config/locale";
import MultiSelectFormField from "@/components/ui/multi-select";
import {
  getProfile,
  updateCurrency,
  updateLocale,
} from "@/gen/proto/fijoy/v1/profile-ProfileService_connectquery";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/_protected/_profile/settings/currency/")(
  {
    component: Page,
  },
);

const currencyFormSchema = z.object({
  primaryCurrency: z.string(),
  supportedCurrencies: z.string().array(),
});
const localeFormSchema = z.object({ locale: z.string() });

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

function Page() {
  const { queryClient, profile } = Route.useRouteContext();

  const [currencyPopoverOpen, setCurrencyPopoverOpen] = useState(false);

  const [localePopoverOpen, setLocalePopoverOpen] = useState(false);

  const currencyForm = useForm<TypeOf<typeof currencyFormSchema>>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues: {
      primaryCurrency: profile.primaryCurrency,
      supportedCurrencies: profile.supportedCurrencies,
    },
  });

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

  const localeForm = useForm<TypeOf<typeof localeFormSchema>>({
    resolver: zodResolver(localeFormSchema),
    defaultValues: { locale: profile.locale },
  });

  const updateLocaleMutation = useMutation(updateLocale, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: createConnectQueryKey(getProfile, {}),
      });
      toast.success("Locale updated");
    },
    onError(error) {
      toast.error(error.message);
    },
    callOptions: {
      headers: getProfileHeader(profile.id),
    },
  });

  function onUpdateLocaleSubmit(values: TypeOf<typeof localeFormSchema>) {
    return updateLocaleMutation.mutateAsync(values);
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
        Configure your primary currency and how it is displayed.
      </p>

      <div className="py-4"></div>

      <div className="space-y-4">
        <Form {...currencyForm}>
          <form
            onSubmit={currencyForm.handleSubmit(onUpdateCurrencySubmit)}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Primary Currency</CardTitle>
                <CardDescription>
                  Your total net worth will be displayed in this currency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={currencyForm.control}
                  name="primaryCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover
                          open={currencyPopoverOpen}
                          onOpenChange={(open) => setCurrencyPopoverOpen(open)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <div className="overflow-x-hidden text-ellipsis">
                                {field.value
                                  ? `${currencyCodeToName(field.value)} (${field.value})`
                                  : "Select currency"}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search currency..." />
                              <CommandList>
                                <CommandEmpty>No currency found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea>
                                    {CURRENCIES.map((currency) => {
                                      const currencyName = `${currencyCodeToName(currency)} (${currency})`;
                                      return (
                                        <CommandItem
                                          value={currencyName}
                                          key={currencyName}
                                          onSelect={() => {
                                            currencyForm.setValue(
                                              "primaryCurrency",
                                              currency,
                                            );
                                            setCurrencyPopoverOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              currency === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {currencyName}
                                        </CommandItem>
                                      );
                                    })}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardHeader className="pt-0">
                <CardTitle className="text-xl">Supported Currencies</CardTitle>
                <CardDescription>
                  You will be able to create accounts in the following
                  currencies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={currencyForm.control}
                  name="supportedCurrencies"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelectFormField
                          options={CURRENCIES.map((c) => ({
                            label: `${currencyCodeToName(c)} (${c})`,
                            value: c,
                          }))}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select currencies"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="space-x-4 border-t px-6 py-4">
                <AnimatePresence mode="wait" initial={false}>
                  <Button
                    disabled={currencyForm.formState.isSubmitting}
                    className="w-16"
                  >
                    {currencyForm.formState.isSubmitting ? (
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

        <Form {...localeForm}>
          <form
            onSubmit={localeForm.handleSubmit(onUpdateLocaleSubmit)}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Locale</CardTitle>
                <CardDescription>
                  This has an impact on how numbers and dates are formatted in
                  Fijoy. <br />
                  {currencyForm.watch("primaryCurrency") &&
                    localeForm.getValues("locale") && (
                      <>
                        Preview: 420 {currencyForm.watch("primaryCurrency")}{" "}
                        will be displayed as{" "}
                        {currencyToDisplay(
                          currency("420"),
                          currencyForm.getValues("primaryCurrency"),
                          {
                            locale: localeForm.getValues("locale"),
                            compact: false,
                          },
                        )}
                      </>
                    )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={localeForm.control}
                  name="locale"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover
                          open={localePopoverOpen}
                          onOpenChange={(open) => setLocalePopoverOpen(open)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <div className="overflow-x-hidden text-ellipsis">
                                {field.value
                                  ? `${localeCodeToName(field.value).unwrapOr("Unknown")} (${field.value})`
                                  : "Select locale"}
                              </div>
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search locale..." />
                              <CommandList>
                                <CommandEmpty>No locale found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea>
                                    {getUserLocales().map((lc) => {
                                      const localeDisplay = `${localeCodeToName(lc).unwrapOr("Unknown")} (${lc})`;
                                      return (
                                        <CommandItem
                                          value={localeDisplay}
                                          key={localeDisplay}
                                          onSelect={() => {
                                            localeForm.setValue("locale", lc);
                                            setLocalePopoverOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              lc === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {localeDisplay}
                                        </CommandItem>
                                      );
                                    })}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="space-x-4 border-t px-6 py-4">
                <AnimatePresence mode="wait" initial={false}>
                  <Button
                    disabled={localeForm.formState.isSubmitting}
                    className="w-16"
                  >
                    {localeForm.formState.isSubmitting ? (
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
