import CurrencyInput from "react-currency-input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown, Wallet } from "lucide-react";
import { InsertAccount } from "@/types/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  accountTypeConfig,
  accountTypes,
  institutionConfig,
  institutions,
} from "@/config/account";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { env } from "@/env";
import { accountsQueryOptions } from "@/lib/queries/account";

const formSchema = InsertAccount;

type Props = {
  workspaceID: string;
};

const AddAccount = ({ workspaceID }: Props) => {
  const [open, setOpen] = useState(false);
  const [accountTypeOpen, setAccountTypeOpen] = useState(false);
  const [institutionOpen, setInstitutionOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient();

  const createAccount = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const result = await axios.post(
        env.VITE_BACKEND_URL + "/account",
        values,
        {
          withCredentials: true,
          params: { workspace_id: workspaceID },
        },
      );
      return result.data;
    },
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: accountsQueryOptions(workspaceID).queryKey,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(createAccount.mutateAsync(values), {
      success: "Account created!",
      loading: "Creating account...",
      error: "Failed to create account.",
    });
  }

  return (
    <div className="">
      <Button
        onClick={() => setOpen(true)}
        variant="default"
        className="w-full lg:w-48"
      >
        <Wallet className="mr-2 h-6 w-6" />
        Add Account
      </Button>

      <Sheet open={open} onOpenChange={(open) => setOpen(open)} modal={true}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="create-account">
            <SheetContent className="max-h-screen space-y-2 overflow-y-scroll p-4">
              <SheetHeader>
                <SheetTitle>New Account</SheetTitle>
                <SheetDescription>Add a new account to Fijoy.</SheetDescription>
              </SheetHeader>
              <div className="py-1"></div>
              <div className="space-y-4 p-1">
                <FormField
                  control={form.control}
                  name="AccountType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Account Type</FormLabel>
                      <Popover
                        open={accountTypeOpen}
                        modal={true}
                        onOpenChange={(open) => setAccountTypeOpen(open)}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? accountTypeConfig[field.value].name
                                : "Select account type"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandList className="max-h-48">
                              <CommandInput
                                placeholder="Search account type..."
                                className="h-9"
                              />
                              <CommandEmpty>
                                No account type found.
                              </CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="">
                                  {accountTypes.map((accountType) => (
                                    <CommandItem
                                      value={accountType}
                                      key={accountType}
                                      onSelect={() => {
                                        form.setValue(
                                          "AccountType",
                                          accountType,
                                        );
                                        setAccountTypeOpen(false);
                                      }}
                                    >
                                      {accountTypeConfig[accountType].name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          accountType === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Institution"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Institution</FormLabel>
                      <Popover
                        open={institutionOpen}
                        modal={true}
                        onOpenChange={(open) => setInstitutionOpen(open)}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                " justify-start",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value && (
                                <Avatar className="mr-2 h-6 w-6">
                                  <AvatarImage
                                    src={institutionConfig[field.value].logo}
                                    alt={field.value}
                                  />
                                  <AvatarFallback>AC</AvatarFallback>
                                </Avatar>
                              )}
                              {field.value
                                ? institutionConfig[field.value].name
                                : "Select institution"}
                              <div className="grow" />
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandList className="max-h-48">
                              <CommandInput
                                placeholder="Search institution..."
                                className="h-9"
                              />
                              <CommandEmpty>No institution found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea>
                                  {institutions.map((institution) => (
                                    <CommandItem
                                      value={institution}
                                      key={institution}
                                      onSelect={() => {
                                        form.setValue(
                                          "Institution",
                                          institution,
                                        );
                                        setInstitutionOpen(false);
                                      }}
                                    >
                                      <Avatar className="mr-2 h-6 w-6">
                                        <AvatarImage
                                          src={
                                            institutionConfig[institution].logo
                                          }
                                          alt={institution}
                                        />
                                        <AvatarFallback>AC</AvatarFallback>
                                      </Avatar>
                                      {institutionConfig[institution].name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          institution === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Balance</FormLabel>

                      <FormDescription>
                        {form.getValues("AccountType") &&
                          accountTypeConfig[form.getValues("AccountType")]
                            .isDebt && (
                            <Card className="p-4 text-muted-foreground">
                              The balance for loan accounts, such as credit
                              cards, mortgages, car loans, etc, represent how
                              much is owed on the account. A positive balance
                              indicates how much debt you have and a negative
                              balance indicates a credit on the account. <br />
                              For credit accounts, typically the balance will be
                              positive.
                            </Card>
                          )}
                      </FormDescription>
                      <FormControl>
                        <CurrencyInput
                          step={1}
                          prefix="$"
                          defaultValue={0}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          onValueChange={(value) => {
                            if (!value) {
                              field.onChange("");
                              return;
                            }

                            field.onChange(+value);
                          }}
                          data-1p-ignore
                        />
                      </FormControl>
                      <FormDescription>
                        What is the current balance of this account?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. BMO Student Chequing"
                          {...field}
                          data-1p-ignore
                        />
                      </FormControl>
                      <FormDescription>
                        This is the display name of your account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" form="create-account" className="w-full">
                  Create
                </Button>
              </div>
            </SheetContent>
          </form>
        </Form>
      </Sheet>
    </div>
  );
};

export default AddAccount;
