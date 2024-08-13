import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewAccount() {
  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          {/* <CardDescription> */}
          {/*   Note that the currency cannot be changed after account creation */}
          {/* </CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
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
    </div>
  );
}
