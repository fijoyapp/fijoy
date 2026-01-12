/**
 * @generated SignedSource<<854d38f2100f65f614634cea19edabcd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TransactionCategoryType = "expense" | "income" | "investment" | "setup" | "transfer" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type categoriesPanelFragment$data = {
  readonly financialReport: {
    readonly expensesByCategoryType: ReadonlyArray<{
      readonly categories: ReadonlyArray<{
        readonly category: {
          readonly id: string;
        };
        readonly total: string;
        readonly transactionCount: number;
      }>;
      readonly categoryType: TransactionCategoryType;
      readonly total: string;
      readonly transactionCount: number;
    }>;
    readonly incomeByCategoryType: ReadonlyArray<{
      readonly categories: ReadonlyArray<{
        readonly category: {
          readonly id: string;
        };
        readonly total: string;
        readonly transactionCount: number;
      }>;
      readonly categoryType: TransactionCategoryType;
      readonly total: string;
      readonly transactionCount: number;
    }>;
    readonly totalExpenses: string;
    readonly totalIncome: string;
  };
  readonly transactionCategories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly type: TransactionCategoryType;
        readonly " $fragmentSpreads": FragmentRefs<"categoryCardFragment">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "categoriesPanelFragment";
};
export type categoriesPanelFragment$key = {
  readonly " $data"?: categoriesPanelFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"categoriesPanelFragment">;
};

import categoriesPanelRefetch_graphql from './categoriesPanelRefetch.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "transactionCategories"
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
  "argumentDefinitions": [
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": categoriesPanelRefetch_graphql
    }
  },
  "name": "categoriesPanelFragment",
  "selections": [
    {
      "alias": "transactionCategories",
      "args": null,
      "concreteType": "TransactionCategoryConnection",
      "kind": "LinkedField",
      "name": "__categoriesPanel_transactionCategories_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "categoryCardFragment"
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
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "524391f467768a074b39397060efb2ae";

export default node;
