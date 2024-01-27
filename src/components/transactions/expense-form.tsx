import { type UseFormReturn } from "react-hook-form";
import { type formSchema } from "./new-transaction";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type SelectAccount } from "@/types/account";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { institutionConfig } from "@/config/account";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  accounts: SelectAccount[];
};

const ExpenseForm = ({ form, accounts }: Props) => {
  const [fromAccountOpen, setFromAccountOpen] = useState(false);

  return (
    <>
      <FormField
        control={form.control}
        name="FromAccountID"
        render={({ field }) => {
          const currentAccount =
            accounts.find((v) => v.ID === field.value) ?? null;
          return (
            <FormItem className="flex flex-col">
              <FormLabel>From Account</FormLabel>
              <Popover
                open={fromAccountOpen}
                modal={true}
                onOpenChange={(open) => setFromAccountOpen(open)}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-start",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value && currentAccount && (
                        <Avatar className="mr-2 h-6 w-6">
                          <AvatarImage
                            src={
                              institutionConfig[currentAccount.Institution].logo
                            }
                            alt={field.value}
                          />
                          <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                      )}
                      {field.value && currentAccount
                        ? currentAccount.Name
                        : "Select account"}
                      <div className="grow" />
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandList className="max-h-48">
                      <CommandInput
                        placeholder="Search account..."
                        className="h-9"
                      />
                      <CommandEmpty>No account found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea>
                          {accounts.map((account) => (
                            <CommandItem
                              value={account.ID}
                              key={account.ID}
                              onSelect={() => {
                                form.setValue("FromAccountID", account.ID);
                                setFromAccountOpen(false);
                              }}
                            >
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage
                                  src={
                                    institutionConfig[account.Institution].logo
                                  }
                                  alt={account.Institution}
                                />
                                <AvatarFallback>AC</AvatarFallback>
                              </Avatar>
                              {account.Name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  account.ID === field.value
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
          );
        }}
      />
    </>
  );
};

export default ExpenseForm;
