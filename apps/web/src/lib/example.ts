import { createPromiseClient } from "@connectrpc/connect";
import { Workspace } from "@/gen/proto/fijoy/v1/workspace_pb";
import { AccountService } from "@/gen/proto/fijoy/v1/account_connect";
import { finalTransport } from "./connect";
import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";

const client = createPromiseClient(AccountService, finalTransport);

export async function populateExample(workspace: Workspace) {
  client.createAccount(
    {
      name: "Cobalt",
      accountType: AccountType.DEBT,
      currency: "CAD",
      balance: {
        units: -BigInt(2333),
        nanos: -690000000,
      },
      institution: "Amex",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
  client.createAccount(
    {
      name: "Wealthsimple Cash",
      accountType: AccountType.CASH,
      currency: "CAD",
      balance: {
        units: BigInt(69420),
        nanos: 690000000,
      },
      institution: "Wealthsimple",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
  client.createAccount(
    {
      name: "Wealthsimple TFSA",
      accountType: AccountType.INVESTMENT,
      currency: "CAD",
      balance: {
        units: BigInt(9999),
        nanos: 990000000,
      },
      institution: "Wealthsimple",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
  client.createAccount(
    {
      name: "CIBC TFSA",
      accountType: AccountType.INVESTMENT,
      currency: "CAD",
      balance: {
        units: BigInt(6666),
        nanos: 660000000,
      },
      institution: "CIBC",
    },
    {
      headers: {
        "Fijoy-Workspace-Id": workspace.id,
      },
    },
  );
}
