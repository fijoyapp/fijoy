/**
 * @generated SignedSource<<9407248324b6da62d641e9f660277bb9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoriesQuery$variables = Record<PropertyKey, never>;
export type CategoriesQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"categoriesPanelFragment">;
};
export type CategoriesQuery = {
  response: CategoriesQuery$data;
  variables: CategoriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "categoriesPanelFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "TransactionCategoryConnection",
        "kind": "LinkedField",
        "name": "transactionCategories",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TransactionCategoryEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TransactionCategory",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "type",
                    "storageKey": null
                  },
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
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "transactionCategories(first:20)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "categoriesPanel_transactionCategories",
        "kind": "LinkedHandle",
        "name": "transactionCategories"
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "period",
            "value": {
              "preset": "ALL_TIME"
            }
          }
        ],
        "concreteType": "FinancialReport",
        "kind": "LinkedField",
        "name": "financialReport",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalIncome",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalExpenses",
            "storageKey": null
          }
        ],
        "storageKey": "financialReport(period:{\"preset\":\"ALL_TIME\"})"
      }
    ]
  },
  "params": {
    "cacheID": "07ca1078fec30c5e89a24d18060a3baf",
    "id": null,
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": "query CategoriesQuery {\n  ...categoriesPanelFragment\n}\n\nfragment categoriesPanelFragment on Query {\n  transactionCategories(first: 20) {\n    edges {\n      node {\n        id\n        type\n        ...categoryCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  financialReport(period: {preset: ALL_TIME}) {\n    totalIncome\n    totalExpenses\n  }\n}\n\nfragment categoryCardFragment on TransactionCategory {\n  id\n  name\n  type\n}\n"
  }
};
})();

(node as any).hash = "101b58b874b8f83913a323092a45e86a";

export default node;
