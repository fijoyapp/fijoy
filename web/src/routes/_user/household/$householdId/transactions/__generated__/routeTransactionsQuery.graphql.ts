/**
 * @generated SignedSource<<68d28aed8116610da5681fd810208a1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeTransactionsQuery$variables = Record<PropertyKey, never>;
export type routeTransactionsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"transactionsPanelFragment">;
};
export type routeTransactionsQuery = {
  response: routeTransactionsQuery$data;
  variables: routeTransactionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "DATETIME"
    }
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeTransactionsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "transactionsPanelFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeTransactionsQuery",
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
                    "name": "datetime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TransactionCategory",
                    "kind": "LinkedField",
                    "name": "category",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      (v1/*: any*/)
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
                      (v1/*: any*/),
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
                        "concreteType": "Account",
                        "kind": "LinkedField",
                        "name": "account",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
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
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
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
        "storageKey": "transactions(first:20,orderBy:{\"direction\":\"DESC\",\"field\":\"DATETIME\"})"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": [
          "where",
          "orderBy"
        ],
        "handle": "connection",
        "key": "transactionsList_transactions",
        "kind": "LinkedHandle",
        "name": "transactions"
      }
    ]
  },
  "params": {
    "cacheID": "3e7c4b48aae61b20a16827f78e92e2ca",
    "id": null,
    "metadata": {},
    "name": "routeTransactionsQuery",
    "operationKind": "query",
    "text": "query routeTransactionsQuery {\n  ...transactionsPanelFragment\n}\n\nfragment transactionCardFragment on Transaction {\n  id\n  datetime\n  category {\n    name\n    type\n    id\n  }\n  transactionEntries {\n    id\n    amount\n    account {\n      name\n      currency {\n        code\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment transactionsListFragment on Query {\n  transactions(first: 20, orderBy: {field: DATETIME, direction: DESC}) {\n    edges {\n      node {\n        id\n        ...transactionCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment transactionsPanelFragment on Query {\n  ...transactionsListFragment\n}\n"
  }
};
})();

(node as any).hash = "703d4c97724f77d5343964517674ad22";

export default node;
