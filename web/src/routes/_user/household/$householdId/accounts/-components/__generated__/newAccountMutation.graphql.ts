/**
 * @generated SignedSource<<61c88228107f7a915b47ea480baa49dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
export type CreateAccountInput = {
  balance?: string | null | undefined;
  currencyID: string;
  iconPath?: string | null | undefined;
  name: string;
  type: AccountType;
};
export type newAccountMutation$variables = {
  input: CreateAccountInput;
};
export type newAccountMutation$data = {
  readonly createAccount: {
    readonly id: string;
    readonly name: string;
  };
};
export type newAccountMutation = {
  response: newAccountMutation$data;
  variables: newAccountMutation$variables;
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "name": "newAccountMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newAccountMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d5d7a59953905206e625eed79ce66955",
    "id": null,
    "metadata": {},
    "name": "newAccountMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "5a15aee2a471fea1fc5cb3fd57248a27";

export default node;
