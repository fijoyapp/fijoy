/**
 * @generated SignedSource<<1d9f876a66f8e867e7f4b8fd84a6f3db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateExpenseInputCustom = {
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
export type newExpenseMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateExpenseInputCustom;
};
export type newExpenseMutation$data = {
  readonly createExpense: {
    readonly node: {
      readonly category: {
        readonly name: string;
      };
      readonly datetime: any;
      readonly description: string | null | undefined;
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"transactionCardFragment">;
    } | null | undefined;
  };
};
export type newExpenseMutation = {
  response: newExpenseMutation$data;
  variables: newExpenseMutation$variables;
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
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    (v3/*: any*/)
  ],
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
    "name": "newExpenseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createExpense",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "transactionCardFragment"
              },
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
    "name": "newExpenseMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TransactionEdge",
        "kind": "LinkedField",
        "name": "createExpense",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "InvestmentLot",
                "kind": "LinkedField",
                "name": "investmentLots",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "price",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Investment",
                    "kind": "LinkedField",
                    "name": "investment",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "symbol",
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "TransactionEntry",
                "kind": "LinkedField",
                "name": "transactionEntries",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Account",
                    "kind": "LinkedField",
                    "name": "account",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v8/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
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
        "handle": "prependEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createExpense",
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
    "cacheID": "5c94afa2f2cf5a624eb0ac9c94ef967e",
    "id": null,
    "metadata": {},
    "name": "newExpenseMutation",
    "operationKind": "mutation",
    "text": "mutation newExpenseMutation(\n  $input: CreateExpenseInputCustom!\n) {\n  createExpense(input: $input) {\n    node {\n      ...transactionCardFragment\n      id\n      description\n      datetime\n      category {\n        name\n        id\n      }\n    }\n  }\n}\n\nfragment transactionCardFragment on Transaction {\n  id\n  datetime\n  category {\n    name\n    type\n    id\n  }\n  investmentLots {\n    id\n    amount\n    price\n    investment {\n      name\n      symbol\n      currency {\n        code\n        id\n      }\n      id\n    }\n  }\n  transactionEntries {\n    id\n    amount\n    account {\n      name\n      currency {\n        code\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1d62027afce077aa8e0fcaaf5f0284c0";

export default node;
