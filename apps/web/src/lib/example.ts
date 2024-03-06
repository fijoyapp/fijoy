import { createPromiseClient } from "@connectrpc/connect";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { AccountService } from "@/gen/proto/fijoy/v1/account_connect";
import { finalTransport } from "./connect";
import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { TransactionService } from "@/gen/proto/fijoy/v1/transaction_connect";
import { Timestamp } from "@bufbuild/protobuf";

const accountClient = createPromiseClient(AccountService, finalTransport);
const transactionClient = createPromiseClient(
  TransactionService,
  finalTransport,
);

export async function populateExample(workspace: Workspace) {
  const a1 = await accountClient.createAccount(
    {
      name: "Cobalt",
      accountType: AccountType.DEBT,
      currency: "CAD",
      institution: "Amex",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
  transactionClient.createAdjustmentTransaction(
    {
      accountId: a1.id,
      amount: {
        units: -BigInt(2333),
        nanos: -690000000,
      },
      datetime: Timestamp.now(),
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );

  const a2 = await accountClient.createAccount(
    {
      name: "Wealthsimple Cash",
      accountType: AccountType.CASH,
      currency: "CAD",
      institution: "Wealthsimple",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
  transactionClient.createAdjustmentTransaction(
    {
      accountId: a2.id,
      amount: {
        units: BigInt(69420),
        nanos: 690000000,
      },
      datetime: Timestamp.now(),
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );

  const a3 = await accountClient.createAccount(
    {
      name: "Wealthsimple TFSA",
      accountType: AccountType.INVESTMENT,
      currency: "CAD",
      institution: "Wealthsimple",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
  transactionClient.createAdjustmentTransaction(
    {
      accountId: a3.id,
      amount: {
        units: BigInt(9999),
        nanos: 990000000,
      },
      datetime: Timestamp.now(),
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );

  const a4 = await accountClient.createAccount(
    {
      name: "CIBC TFSA",
      accountType: AccountType.INVESTMENT,
      currency: "CAD",
      institution: "CIBC",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
  transactionClient.createAdjustmentTransaction(
    {
      accountId: a4.id,
      amount: {
        units: BigInt(6666),
        nanos: 660000000,
      },
      datetime: Timestamp.now(),
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
}
