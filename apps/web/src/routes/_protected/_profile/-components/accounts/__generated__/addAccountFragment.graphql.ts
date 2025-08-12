/**
 * @generated SignedSource<<99ada1548bcd8dea8bd34ebad593d524>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type addAccountFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newAccountInvestmentFragment">;
  readonly " $fragmentType": "addAccountFragment";
};
export type addAccountFragment$key = {
  readonly " $data"?: addAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"addAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "addAccountFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "newAccountInvestmentFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "64399c34fbe2b57454bba37417c830a9";

export default node;
