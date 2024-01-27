import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/workspace/$namespace/")({
  component: Page,
});

function Page() {
  const { namespace } = Route.useParams();
  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Hey there!</PageHeaderHeading>
        <PageHeaderDescription className="">
          Welcome back! How are you doing today?
        </PageHeaderDescription>
      </PageHeader>
      <div className="py-2 lg:py-4" />
      <div>{namespace}</div>
      {/* <NewTransaction accounts={accounts} /> */}
    </div>
  );
}

export default Page;
