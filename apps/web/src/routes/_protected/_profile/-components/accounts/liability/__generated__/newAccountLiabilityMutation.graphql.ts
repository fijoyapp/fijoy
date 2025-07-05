/**
 * @generated SignedSource<<9f5f089f1a13551dc734d1428e5172fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
export type AccountTickerType = "crypto" | "currency" | "stock" | "%future added value";
export type CreateAccountInput = {
  accountType: AccountAccountType;
  amount: string;
  archived?: boolean | null | undefined;
  createTime?: any | null | undefined;
  currencySymbol: string;
  name: string;
  ticker: string;
  tickerType: AccountTickerType;
  transactionEntryIDs?: ReadonlyArray<string> | null | undefined;
  updateTime?: any | null | undefined;
};
export type newAccountLiabilityMutation$variables = {
  input: CreateAccountInput;
};
export type newAccountLiabilityMutation$data = {
  readonly createAccount: {
    readonly id: string;
  };
};
export type newAccountLiabilityMutation = {
  response: newAccountLiabilityMutation$data;
  variables: newAccountLiabilityMutation$variables;
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
    "name": "newAccountLiabilityMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newAccountLiabilityMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d351304f3787b3e11dc7ae58f4990a5c",
    "id": null,
    "metadata": {},
    "name": "newAccountLiabilityMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountLiabilityMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "87de28bf86c3a8e3bc853a44cc440d1f";

export default node;
