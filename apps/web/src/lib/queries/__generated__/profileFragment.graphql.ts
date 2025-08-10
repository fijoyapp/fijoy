/**
 * @generated SignedSource<<405784f389dd8e34f736cb8a6e34ec86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type profileFragment$data = ReadonlyArray<{
  readonly currencies: ReadonlyArray<string>;
  readonly id: string;
  readonly locale: string;
  readonly name: string;
  readonly netWorthGoal: string;
  readonly " $fragmentType": "profileFragment";
}>;
export type profileFragment$key = ReadonlyArray<{
  readonly " $data"?: profileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"profileFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
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
      "name": "name",
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

(node as any).hash = "6ffb8a80e0d1dfe68260c19d3cff7502";

export default node;
