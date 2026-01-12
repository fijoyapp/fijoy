/**
 * @generated SignedSource<<6218c09f279dbb7610258a1be2e12917>>
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
  "name": "total",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "transactionCount",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "categoryType",
    "storageKey": null
  },
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "CategoryAggregate",
    "kind": "LinkedField",
    "name": "categories",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TransactionCategory",
        "kind": "LinkedField",
        "name": "category",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "storageKey": null
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
                  (v1/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoryTypeAggregate",
            "kind": "LinkedField",
            "name": "incomeByCategoryType",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoryTypeAggregate",
            "kind": "LinkedField",
            "name": "expensesByCategoryType",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": "financialReport(period:{\"preset\":\"ALL_TIME\"})"
      }
    ]
  },
  "params": {
    "cacheID": "9f8230eec2bbacc5c093fdb446218a09",
    "id": null,
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": "query CategoriesQuery {\n  ...categoriesPanelFragment\n}\n\nfragment categoriesPanelFragment on Query {\n  transactionCategories(first: 20) {\n    edges {\n      node {\n        id\n        type\n        ...categoryCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  financialReport(period: {preset: ALL_TIME}) {\n    totalIncome\n    totalExpenses\n    incomeByCategoryType {\n      categoryType\n      total\n      transactionCount\n      categories {\n        category {\n          id\n        }\n        total\n        transactionCount\n      }\n    }\n    expensesByCategoryType {\n      categoryType\n      total\n      transactionCount\n      categories {\n        category {\n          id\n        }\n        total\n        transactionCount\n      }\n    }\n  }\n}\n\nfragment categoryCardFragment on TransactionCategory {\n  id\n  name\n  type\n}\n"
  }
};
})();

(node as any).hash = "101b58b874b8f83913a323092a45e86a";

export default node;
