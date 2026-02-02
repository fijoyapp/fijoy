/**
 * @generated SignedSource<<1335e7a6d9de8f4acaf403b0aca7fd30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type appSidebarFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"householdSwitcherFragment" | "navUserFragment">;
  readonly " $fragmentType": "appSidebarFragment";
};
export type appSidebarFragment$key = {
  readonly " $data"?: appSidebarFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"appSidebarFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "appSidebarFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "householdSwitcherFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "navUserFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "7bc92594887631434a15dc63db84223c";

export default node;
