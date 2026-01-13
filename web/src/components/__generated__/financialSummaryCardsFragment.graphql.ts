/**
 * @generated SignedSource<<d1428a8d098f8cec7b7fea2c64c508f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type financialSummaryCardsFragment$data = {
  readonly totalExpenses: string;
  readonly totalIncome: string;
  readonly " $fragmentType": "financialSummaryCardsFragment";
};
export type financialSummaryCardsFragment$key = {
  readonly " $data"?: financialSummaryCardsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"financialSummaryCardsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "financialSummaryCardsFragment",
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
  "type": "FinancialReport",
  "abstractKey": null
};

(node as any).hash = "1290e12d8c455cc231cc04bc422a93f7";

export default node;
