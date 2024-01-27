import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import NewTransaction from "@/components/transactions/new-transaction";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protected/workspace/$namespace/")({
  component: Page,
});

function Page() {
  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Hey there!</PageHeaderHeading>
        <PageHeaderDescription className="">
          Welcome back! How are you doing today?
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-2 lg:py-4" />
      <NewTransaction accounts={[]} />
    </div>
  );
}

export default Page;
