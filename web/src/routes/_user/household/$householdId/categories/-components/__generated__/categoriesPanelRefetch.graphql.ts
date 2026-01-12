/**
 * @generated SignedSource<<cf3c0688ddb51a812c01772c97296ad8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type categoriesPanelRefetch$variables = {
  count?: number | null | undefined;
  cursor?: any | null | undefined;
  timezone: string;
};
export type categoriesPanelRefetch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"categoriesPanelFragment">;
};
export type categoriesPanelRefetch = {
  response: categoriesPanelRefetch$data;
  variables: categoriesPanelRefetch$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 20,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "timezone"
  }
],
v1 = {
  "kind": "Variable",
  "name": "timezone",
  "variableName": "timezone"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
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
  "name": "total",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "transactionCount",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "categoryType",
    "storageKey": null
  },
  (v4/*: any*/),
  (v5/*: any*/),
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
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "categoriesPanelRefetch",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "categoriesPanelFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "categoriesPanelRefetch",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
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
            "fields": [
              {
                "kind": "Literal",
                "name": "preset",
                "value": "ALL_TIME"
              },
              (v1/*: any*/)
            ],
            "kind": "ObjectValue",
            "name": "period"
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
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoryTypeAggregate",
            "kind": "LinkedField",
            "name": "expensesByCategoryType",
            "plural": true,
            "selections": (v6/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "143d5c1086def7f5aeb1c60af282b062",
    "id": null,
    "metadata": {},
    "name": "categoriesPanelRefetch",
    "operationKind": "query",
    "text": "query categoriesPanelRefetch(\n  $count: Int = 20\n  $cursor: Cursor\n  $timezone: String!\n) {\n  ...categoriesPanelFragment_3QwQk9\n}\n\nfragment categoriesPanelFragment_3QwQk9 on Query {\n  transactionCategories(first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        type\n        ...categoryCardCategoryFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  financialReport(period: {preset: ALL_TIME, timezone: $timezone}) {\n    totalIncome\n    totalExpenses\n    incomeByCategoryType {\n      categoryType\n      total\n      transactionCount\n    }\n    expensesByCategoryType {\n      categoryType\n      total\n      transactionCount\n    }\n    ...categoryCardFinancialReportFragment\n  }\n}\n\nfragment categoryCardCategoryFragment on TransactionCategory {\n  id\n  name\n  type\n}\n\nfragment categoryCardFinancialReportFragment on FinancialReport {\n  incomeByCategoryType {\n    categories {\n      category {\n        id\n      }\n      total\n      transactionCount\n    }\n  }\n  expensesByCategoryType {\n    categories {\n      category {\n        id\n      }\n      total\n      transactionCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "206f6a70a45d0a14238a47387d668f92";

export default node;
