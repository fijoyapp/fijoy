/**
 * @generated SignedSource<<d74ebef8e4ba44c39b98fb2f0a3630f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateTransactionInput = {
  createdAt?: any | null | undefined;
  datetime?: any | null | undefined;
  note?: string | null | undefined;
  transactionEntries: ReadonlyArray<CreateTransactionEntryInput>;
  transactionEntryIDs?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
};
export type CreateTransactionEntryInput = {
  accountID: string;
  amount: string;
  transactionID: string;
};
export type newTransactionMutation$variables = {
  input: CreateTransactionInput;
};
export type newTransactionMutation$data = {
  readonly createTransaction: {
    readonly id: string;
  };
};
export type newTransactionMutation = {
  response: newTransactionMutation$data;
  variables: newTransactionMutation$variables;
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
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "createTransaction",
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
    "name": "newTransactionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newTransactionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c0d1ab3df593640e51eed7914413166c",
    "id": null,
    "metadata": {},
    "name": "newTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation newTransactionMutation(\n  $input: CreateTransactionInput!\n) {\n  createTransaction(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa1c29246abb05187a6b902822ea183a";

export default node;
