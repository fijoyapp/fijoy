import { createPromiseClient } from "@connectrpc/connect";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { AccountService } from "@/gen/proto/fijoy/v1/account_connect";
import { finalTransport } from "./connect";
import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
// import { TransactionService } from "@/gen/proto/fijoy/v1/transaction_connect";
// import { Timestamp } from "@bufbuild/protobuf";
import { getWorkspaceHeader } from "./headers";

const accountClient = createPromiseClient(AccountService, finalTransport);
// const transactionClient = createPromiseClient(
//   TransactionService,
//   finalTransport,
// );

export async function populateExample(workspace: Workspace) {
  const headers = getWorkspaceHeader(workspace.id);
  const cobalt = await accountClient.createAccount(
    {
      name: "Cobalt",
      accountType: AccountType.DEBT,
      balance: {
        currencyCode: "CAD",
        nanos: 690000000,
        units: BigInt(2333),
      },
      institution: "Amex",
    },
    { headers },
  );
  console.log(cobalt);

  const wealthsimpleCash = await accountClient.createAccount(
    {
      name: "Wealthsimple Cash",
      accountType: AccountType.CASH,
      balance: {
        currencyCode: "CAD",
        nanos: 690000000,
        units: BigInt(69420),
      },
      institution: "Wealthsimple",
    },
    { headers },
  );
  console.log(wealthsimpleCash);

  const tangerineSavings = await accountClient.createAccount(
    {
      name: "Tangerine Savings",
      accountType: AccountType.CASH,
      balance: {
        currencyCode: "CAD",
        nanos: 990000000,
        units: BigInt(9999),
      },
      institution: "Tangerine",
    },
    { headers },
  );
  console.log(tangerineSavings);

  const tangerineChequing = await accountClient.createAccount(
    {
      name: "Tangerine Chequing",
      accountType: AccountType.CASH,
      balance: {
        currencyCode: "CAD",
        nanos: 660000000,
        units: BigInt(66),
      },
      institution: "Tangerine",
    },
    { headers },
  );
  console.log(tangerineChequing);
}
