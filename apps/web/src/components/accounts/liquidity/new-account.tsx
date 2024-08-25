import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NameField } from "../form/name";
import { CurrencyField } from "../form/currency";
import { useProfile } from "@/hooks/use-profile";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  symbol: z.string().length(3),
});

export default function NewAccount() {
  const { profile } = useProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: profile?.currencies[0],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex max-w-lg flex-col space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              {/* <CardDescription> */}
              {/*   Note that the currency cannot be changed after account creation */}
              {/* </CardDescription> */}
            </CardHeader>
            <CardContent>
              <NameField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Give your account a descriptive name, e.g. Wealthsimple Cash"
              />

              <CurrencyField
                control={form.control}
                name="symbol"
                label="Account Currency"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              {/* <CardDescription>The initial balance of the account</CardDescription> */}
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>

          <Button className="ml-auto">Create</Button>
        </form>
      </Form>
    </div>
  );
}
