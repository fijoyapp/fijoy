/**
 * @generated SignedSource<<b5a704909b4ef077290353e08cc96020>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountsViewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountListViewFragment" | "netWorthInfoFragment">;
  readonly " $fragmentType": "accountsViewFragment";
};
export type accountsViewFragment$key = {
  readonly " $data"?: accountsViewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountsViewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountsViewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "netWorthInfoFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "accountListViewFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "4d8b4819df3ce7727436b66c0a8287e3";

export default node;
