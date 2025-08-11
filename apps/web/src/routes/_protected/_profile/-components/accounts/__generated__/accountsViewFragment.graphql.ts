/**
 * @generated SignedSource<<8c2911418bff638c56430926aabe6fc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountsViewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsDataTableFragment" | "netWorthInfoFragment">;
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
      "name": "accountsDataTableFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "05278b8668a0d3d9818a68907e6f3637";

export default node;
