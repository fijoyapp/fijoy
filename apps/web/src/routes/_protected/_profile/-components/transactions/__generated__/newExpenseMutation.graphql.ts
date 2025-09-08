/**
 * @generated SignedSource<<4ae2a2af10a9fbd234c6ab302254d2ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateTransactionWithTransactionEntriesInput = {
  datetime?: any | null | undefined;
  note?: string | null | undefined;
  transactionEntries: ReadonlyArray<CreateTransactionEntryInput>;
};
export type CreateTransactionEntryInput = {
  accountID: string;
  amount: string;
  createTime?: any | null | undefined;
  note?: string | null | undefined;
  transactionID: string;
  updateTime?: any | null | undefined;
};
export type newExpenseMutation$variables = {
  input: CreateTransactionWithTransactionEntriesInput;
};
export type newExpenseMutation$data = {
  readonly createTransactionWithTransactionEntries: {
    readonly createTime: any;
    readonly id: string;
    readonly note: string | null | undefined;
    readonly transactionEntries: ReadonlyArray<{
      readonly account: {
        readonly amount: string;
        readonly balance: string;
        readonly id: string;
      };
      readonly id: string;
      readonly note: string | null | undefined;
    }> | null | undefined;
  };
};
export type newExpenseMutation = {
  response: newExpenseMutation$data;
  variables: newExpenseMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v3 = [
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
    "name": "createTransactionWithTransactionEntries",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createTime",
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "TransactionEntry",
        "kind": "LinkedField",
        "name": "transactionEntries",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "balance",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "newExpenseMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newExpenseMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "f160e345ad12f0d4558eceae719051bd",
    "id": null,
    "metadata": {},
    "name": "newExpenseMutation",
    "operationKind": "mutation",
    "text": "mutation newExpenseMutation(\n  $input: CreateTransactionWithTransactionEntriesInput!\n) {\n  createTransactionWithTransactionEntries(input: $input) {\n    id\n    createTime\n    note\n    transactionEntries {\n      id\n      note\n      account {\n        id\n        balance\n        amount\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0a43ccd51d3009b0208bcfcbe35c7f22";

export default node;
