/**
 * @generated SignedSource<<dda7743f773a749d9f9734f40667e3e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
export type AccountInvestmentType = "fhsa" | "non_investment" | "rrsp" | "taxable" | "tfsa" | "%future added value";
export type AccountTickerType = "crypto" | "currency" | "stock" | "%future added value";
export type CreateAccountInput = {
  accountType: AccountAccountType;
  amount: string;
  archived?: boolean | null | undefined;
  createTime?: any | null | undefined;
  currencySymbol: string;
  investmentType: AccountInvestmentType;
  lmao: string;
  name: string;
  ticker: string;
  tickerType: AccountTickerType;
  transactionEntryIDs?: ReadonlyArray<string> | null | undefined;
  updateTime?: any | null | undefined;
};
export type newAccountReceivableMutation$variables = {
  input: CreateAccountInput;
};
export type newAccountReceivableMutation$data = {
  readonly createAccount: {
    readonly id: string;
  };
};
export type newAccountReceivableMutation = {
  response: newAccountReceivableMutation$data;
  variables: newAccountReceivableMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "createAccount",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newAccountReceivableMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newAccountReceivableMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "aecc964c3f8351365ccfdaadf663bdfc",
    "id": null,
    "metadata": {},
    "name": "newAccountReceivableMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountReceivableMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2115d8d34ab142294c92288ad4d553b1";

export default node;
