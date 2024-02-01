import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import NewTransaction from "@/components/transactions/new-transaction";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/_protected/workspace/$namespace/_namespace/transactions",
)({
  component: Page,
});

function Page() {
  return (
    <div className="container max-w-screen-2xl">
      <PageHeader>
        <PageHeaderHeading className="">Transactions</PageHeaderHeading>
        <PageHeaderDescription className="">
          The home for all your transactions.
        </PageHeaderDescription>
      </PageHeader>

      <div className="py-2 lg:py-4" />

      <NewTransaction accounts={[]} />

      <div className="py-2 lg:py-4" />

      {/* <DataTable columns={columns} data={transactions} /> */}
    </div>
  );
}

export default Page;
