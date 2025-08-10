/**
 * @generated SignedSource<<3d9130defd0e44a0c21d3b4a6043a734>>
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
  transactionID: string;
  updateTime?: any | null | undefined;
};
export type newExpenseMutation$variables = {
  input: CreateTransactionWithTransactionEntriesInput;
};
export type newExpenseMutation$data = {
  readonly createTransactionWithTransactionEntries: {
    readonly balance: string;
    readonly datetime: any;
    readonly id: string;
    readonly note: string | null | undefined;
    readonly transactionEntries: ReadonlyArray<{
      readonly account: {
        readonly amount: string;
        readonly balance: string;
        readonly id: string;
      };
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
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "datetime",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "balance",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newExpenseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "createTransactionWithTransactionEntries",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TransactionEntry",
            "kind": "LinkedField",
            "name": "transactionEntries",
            "plural": true,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newExpenseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "createTransactionWithTransactionEntries",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TransactionEntry",
            "kind": "LinkedField",
            "name": "transactionEntries",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e57654ba686e4629f5060400c2212966",
    "id": null,
    "metadata": {},
    "name": "newExpenseMutation",
    "operationKind": "mutation",
    "text": "mutation newExpenseMutation(\n  $input: CreateTransactionWithTransactionEntriesInput!\n) {\n  createTransactionWithTransactionEntries(input: $input) {\n    id\n    datetime\n    note\n    balance\n    transactionEntries {\n      account {\n        id\n        balance\n        amount\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a0f6613040e9f4bf3d79269dc54633b8";

export default node;
