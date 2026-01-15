/**
 * @generated SignedSource<<76fe1b249b73c61f63df2e63c3e423c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateTransferInputCustom = {
  fees?: ReadonlyArray<CreateTransactionEntryInput>;
  transaction: CreateTransactionInput;
  transactionEntries: ReadonlyArray<CreateTransactionEntryInput>;
};
export type CreateTransactionInput = {
  categoryID: string;
  datetime: any;
  description?: string | null | undefined;
};
export type CreateTransactionEntryInput = {
  accountID: string;
  amount: string;
};
export type newTransferMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateTransferInputCustom;
};
export type newTransferMutation$data = {
  readonly createTransfer: {
    readonly node: {
      readonly category: {
        readonly name: string;
      };
      readonly datetime: any;
      readonly description: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  };
};
export type newTransferMutation = {
  response: newTransferMutation$data;
  variables: newTransferMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "datetime",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "newTransferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createTransfer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TransactionCategory",
                "kind": "LinkedField",
                "name": "category",
                "plural": false,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "newTransferMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createTransfer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TransactionCategory",
                "kind": "LinkedField",
                "name": "category",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createTransfer",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "8fa9d1e7a07dda8482f6cc042eb01932",
    "id": null,
    "metadata": {},
    "name": "newTransferMutation",
    "operationKind": "mutation",
    "text": "mutation newTransferMutation(\n  $input: CreateTransferInputCustom!\n) {\n  createTransfer(input: $input) {\n    node {\n      id\n      description\n      datetime\n      category {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f8bdf649c9006130b4ebdcfaf3d6357";

export default node;
