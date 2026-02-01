/**
 * @generated SignedSource<<ae2a458d4d7e8fea6fed322cdfb78703>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type financialSummaryCardsFragment$data = {
  readonly expensesBreakdown: {
    readonly total: string;
  };
  readonly incomeBreakdown: {
    readonly total: string;
  };
  readonly " $fragmentType": "financialSummaryCardsFragment";
};
export type financialSummaryCardsFragment$key = {
  readonly " $data"?: financialSummaryCardsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"financialSummaryCardsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "total",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "financialSummaryCardsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryTypeAggregate",
      "kind": "LinkedField",
      "name": "incomeBreakdown",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryTypeAggregate",
      "kind": "LinkedField",
      "name": "expensesBreakdown",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "FinancialReport",
  "abstractKey": null
};
})();

(node as any).hash = "f4870b160f5dc3a4da116c4b39ac7d02";

export default node;
