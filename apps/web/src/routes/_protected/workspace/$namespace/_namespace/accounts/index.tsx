import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/small-header";
import { createFileRoute } from "@tanstack/react-router";

// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { getMoneyDisplay } from "@/lib/money";
// import { accountTypeConfig, accountTypes } from "@/config/account";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import AccountSection from "@/components/accounts/account-section";
// import AddAccount from "@/components/accounts/add-account";
// import { Account } from "@/gen/proto/fijoy/v1/account_pb";

export const Route = createFileRoute(
  "/_protected/workspace/$namespace/_namespace/accounts/",
)({
  // loader: (opts) => {
  //   return opts.context.queryClient.ensureQueryData(
  //     accountsQueryOptions(opts.context.workspace.ID),
  //   );
  // },
  component: Page,
});

function Page() {
  // const { workspace, accounts } = Route.useRouteContext();

  return (
    <div className="container max-w-screen-2xl">
      <div className="items-end gap-4 lg:flex">
        <PageHeader>
          <PageHeaderHeading className="">Accounts</PageHeaderHeading>
          <PageHeaderDescription className="">
            View all accounts at a glance.
          </PageHeaderDescription>
        </PageHeader>
        {/* <div className="grow" /> */}
        {/* <Carousel className="mx-auto w-3/4 sm:hidden"> */}
        {/*   <CarouselContent> */}
        {/*     <CarouselItem className="basis-1/2"> */}
        {/*       <NetWorthCard accounts={accounts} /> */}
        {/*     </CarouselItem> */}
        {/*     <CarouselItem className="basis-1/2"> */}
        {/*       <TotalDebtCard accounts={accounts} /> */}
        {/*     </CarouselItem> */}
        {/*     <CarouselItem className="basis-1/2"> */}
        {/*       <TotalAssetCard accounts={accounts} /> */}
        {/*     </CarouselItem> */}
        {/*   </CarouselContent> */}
        {/*   <CarouselPrevious /> */}
        {/*   <CarouselNext /> */}
        {/* </Carousel> */}
        {/* <div className="hidden items-center justify-center sm:flex"> */}
        {/*   <NetWorthCard accounts={accounts} /> */}
        {/*   <TotalDebtCard accounts={accounts} /> */}
        {/*   <TotalAssetCard accounts={accounts} /> */}
        {/* </div> */}
      </div>

      <div className="py-2 lg:py-4" />

      {/* <AddAccount workspaceID={workspace.id} /> */}

      <div className="py-2 lg:py-4" />

      {/* <div className="lg:columns-2"> */}
      {/*   {accountTypes.map((type) => { */}
      {/*     const filteredAccounts = accounts.filter( */}
      {/*       (acc) => acc.accountType === type, */}
      {/*     ); */}
      {/*     if (filteredAccounts.length === 0) return null; */}
      {/*     return ( */}
      {/*       <div key={type} className="min-h-0 break-inside-avoid-column py-2"> */}
      {/*         <AccountSection */}
      {/*           name={accountTypeConfig[type].name} */}
      {/*           accounts={filteredAccounts} */}
      {/*         /> */}
      {/*       </div> */}
      {/*     ); */}
      {/*   })} */}
      {/* </div> */}

      <div className="py-2 lg:py-4" />
    </div>
  );
}

// type CardProps = {
//   accounts: Account[];
// };
//
// const NetWorthCard = ({ accounts }: CardProps) => {
//   return (
//     <Card className="border-none shadow-none">
//       <CardHeader>
//         <CardDescription>Net Worth</CardDescription>
//         <CardTitle className=" ">
//           {getMoneyDisplay(
//             accounts.reduce((acc, cur) => acc + cur.Balance, 0),
//             { compact: true },
//           )}
//         </CardTitle>
//       </CardHeader>
//     </Card>
//   );
// };
//
// const TotalDebtCard = ({ accounts }: CardProps) => {
//   return (
//     <Card className="border-none shadow-none">
//       <CardHeader>
//         <CardDescription>Total Debt</CardDescription>
//         <CardTitle className="font-roboto-mono">
//           {getMoneyDisplay(
//             accounts.reduce(
//               (acc, cur) =>
//                 acc +
//                 (accountTypeConfig[cur.AccountType].isDebt ? cur.Balance : 0),
//               0,
//             ),
//             { isDebt: false, compact: true },
//           )}
//         </CardTitle>
//       </CardHeader>
//     </Card>
//   );
// };
//
// const TotalAssetCard = ({ accounts }: CardProps) => {
//   return (
//     <Card className="border-none shadow-none">
//       <CardHeader>
//         <CardDescription>Total Asset</CardDescription>
//         <CardTitle className="font-roboto-mono">
//           {getMoneyDisplay(
//             accounts.reduce(
//               (acc, cur) =>
//                 acc +
//                 (accountTypeConfig[cur.AccountType].isDebt ? 0 : cur.Balance),
//               0,
//             ),
//             { isDebt: false, compact: true },
//           )}
//         </CardTitle>
//       </CardHeader>
//     </Card>
//   );
// };
//
export default Page;
