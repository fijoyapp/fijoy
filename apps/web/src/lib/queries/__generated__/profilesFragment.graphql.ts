/**
 * @generated SignedSource<<62ad77f46b280cff33662f1341902e64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type profilesFragment$data = ReadonlyArray<{
  readonly currencies: ReadonlyArray<string>;
  readonly id: string;
  readonly locale: string;
  readonly name: string;
  readonly netWorthGoal: string;
  readonly " $fragmentType": "profilesFragment";
}>;
export type profilesFragment$key = ReadonlyArray<{
  readonly " $data"?: profilesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"profilesFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "profilesFragment",
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

(node as any).hash = "c415f2469a3232f0a94f97b3ec0851c9";

export default node;
