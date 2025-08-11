/**
 * @generated SignedSource<<f1c3dd398a8b5ebb114dc6df23329c30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransactionsPageRefetch$variables = Record<PropertyKey, never>;
export type TransactionsPageRefetch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"transactionsPageFragment">;
};
export type TransactionsPageRefetch = {
  response: TransactionsPageRefetch$data;
  variables: TransactionsPageRefetch$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TransactionsPageRefetch",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "transactionsPageFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TransactionsPageRefetch",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "TransactionConnection",
        "kind": "LinkedField",
        "name": "transactions",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TransactionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Transaction",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "note",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "datetime",
                    "storageKey": null
                  },
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
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "transactions(first:20)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "TransactionsDataTable_transactions",
        "kind": "LinkedHandle",
        "name": "transactions"
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 1000
          }
        ],
        "concreteType": "AccountConnection",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "amount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "currencySymbol",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tickerType",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "accounts(first:1000)"
      }
    ]
  },
  "params": {
    "cacheID": "5e61215800c5f5a29803165b4e67d817",
    "id": null,
    "metadata": {},
    "name": "TransactionsPageRefetch",
    "operationKind": "query",
    "text": "query TransactionsPageRefetch {\n  ...transactionsPageFragment\n}\n\nfragment newExpenseFragment on Query {\n  ...selectAccountFragment\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        currencySymbol\n      }\n    }\n  }\n}\n\nfragment newIncomeFragment on Query {\n  ...selectAccountFragment\n}\n\nfragment newTransferFragment on Query {\n  ...selectAccountFragment\n}\n\nfragment selectAccountFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        name\n        amount\n        currencySymbol\n        tickerType\n      }\n    }\n  }\n}\n\nfragment transactionDataTableFragment on Query {\n  transactions(first: 20) {\n    edges {\n      node {\n        id\n        note\n        datetime\n        balance\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment transactionsPageFragment on Query {\n  ...transactionDataTableFragment\n  ...newExpenseFragment\n  ...newIncomeFragment\n  ...newTransferFragment\n}\n"
  }
};
})();

(node as any).hash = "d60e05deab815bae7da9167f3c096a5e";

export default node;
