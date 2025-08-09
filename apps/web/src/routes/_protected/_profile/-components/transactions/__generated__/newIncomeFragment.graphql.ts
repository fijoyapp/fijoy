/**
 * @generated SignedSource<<c933e5c8c210acc39dad65a94914063f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newIncomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"selectAccountFragment">;
  readonly " $fragmentType": "newIncomeFragment";
};
export type newIncomeFragment$key = {
  readonly " $data"?: newIncomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newIncomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newIncomeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "selectAccountFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "377d659b5e41ca0b5824ccfcf5e11e23";

export default node;
