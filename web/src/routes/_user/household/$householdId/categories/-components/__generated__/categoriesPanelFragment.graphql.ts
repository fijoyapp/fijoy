/**
 * @generated SignedSource<<92fdca7f874ff6ff3650bf86772dba98>>
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
        }
      ],
      "storageKey": "financialReport(period:{\"preset\":\"ALL_TIME\"})"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "dc4890e1975f5d2e6da09f1627c63957";

export default node;
