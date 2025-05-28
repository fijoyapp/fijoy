/**
 * @generated SignedSource<<4eedf1bfcf3bbfa1c4532d16d8f39f0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
export type AccountSymbolType = "crypto" | "currency" | "stock" | "%future added value";
export type CreateAccountInput = {
  accountType: AccountAccountType;
  amount: string;
  name: string;
  symbol: string;
  symbolType: AccountSymbolType;
};
export type newAccountPropertyMutation$variables = {
  input: CreateAccountInput;
};
export type newAccountPropertyMutation$data = {
  readonly createAccount: {
    readonly id: string;
  };
};
export type newAccountPropertyMutation = {
  response: newAccountPropertyMutation$data;
  variables: newAccountPropertyMutation$variables;
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
    "name": "newAccountPropertyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newAccountPropertyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "298baa892c05404da9b434a78ab5ce11",
    "id": null,
    "metadata": {},
    "name": "newAccountPropertyMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountPropertyMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "53a99803bccbd5f630b728afe7daa9a5";

export default node;
