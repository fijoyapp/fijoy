/**
 * @generated SignedSource<<f2f9f928999852df38079bff93656412>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateIncomeInputCustom = {
  fees?: ReadonlyArray<CreateTransactionEntryInput>;
  transaction: CreateTransactionInput;
  transactionEntry: CreateTransactionEntryInput;
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
export type newIncomeMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateIncomeInputCustom;
};
export type newIncomeMutation$data = {
  readonly createIncome: {
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
export type newIncomeMutation = {
  response: newIncomeMutation$data;
  variables: newIncomeMutation$variables;
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
    "name": "newIncomeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createIncome",
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
    "name": "newIncomeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createIncome",
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
        "name": "createIncome",
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
    "cacheID": "7b7e43955a5885b884e1f7c336eab172",
    "id": null,
    "metadata": {},
    "name": "newIncomeMutation",
    "operationKind": "mutation",
    "text": "mutation newIncomeMutation(\n  $input: CreateIncomeInputCustom!\n) {\n  createIncome(input: $input) {\n    node {\n      id\n      description\n      datetime\n      category {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ec6bbaf3fdcbbbec8cf7f7ee1e155050";

export default node;
