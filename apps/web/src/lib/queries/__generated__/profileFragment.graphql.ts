/**
 * @generated SignedSource<<330cee8eafe0c6588072973f4d78cde0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type profileFragment$data = {
  readonly currencies: string;
  readonly id: string;
  readonly locale: string;
  readonly netWorthGoal: string;
  readonly " $fragmentType": "profileFragment";
};
export type profileFragment$key = {
  readonly " $data"?: profileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"profileFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "profileFragment",
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
      "name": "currencies",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locale",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "netWorthGoal",
      "storageKey": null
    }
  ],
  "type": "Profile",
  "abstractKey": null
};

(node as any).hash = "825292b5ca8310efc1a98765676da6f9";

export default node;
