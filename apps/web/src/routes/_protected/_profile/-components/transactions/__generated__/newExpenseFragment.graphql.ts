/**
 * @generated SignedSource<<f3c44131d1d5687351dc2857eba69465>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newExpenseFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"selectAccountFragment">;
  readonly " $fragmentType": "newExpenseFragment";
};
export type newExpenseFragment$key = {
  readonly " $data"?: newExpenseFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newExpenseFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newExpenseFragment",
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

(node as any).hash = "3eeeb129cf18065541582c8a14e3598b";

export default node;
