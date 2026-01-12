/**
 * @generated SignedSource<<2acb73f5c58fb8467f421241ee3a9de0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type categoryCardFinancialReportFragment$data = {
  readonly expensesByCategoryType: ReadonlyArray<{
    readonly categories: ReadonlyArray<{
      readonly category: {
        readonly id: string;
      };
      readonly total: string;
      readonly transactionCount: number;
    }>;
  }>;
  readonly incomeByCategoryType: ReadonlyArray<{
    readonly categories: ReadonlyArray<{
      readonly category: {
        readonly id: string;
      };
      readonly total: string;
      readonly transactionCount: number;
    }>;
  }>;
  readonly " $fragmentType": "categoryCardFinancialReportFragment";
};
export type categoryCardFinancialReportFragment$key = {
  readonly " $data"?: categoryCardFinancialReportFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"categoryCardFinancialReportFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "total",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "transactionCount",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "categoryCardFinancialReportFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryTypeAggregate",
      "kind": "LinkedField",
      "name": "incomeByCategoryType",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryTypeAggregate",
      "kind": "LinkedField",
      "name": "expensesByCategoryType",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "FinancialReport",
  "abstractKey": null
};
})();

(node as any).hash = "3e98607262d3c8b061f20789593acd51";

export default node;
