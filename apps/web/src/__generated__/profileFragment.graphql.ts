/**
 * @generated SignedSource<<284e1669b49cc008388205f62eb4d474>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type profileFragment$data = {
  readonly profile: {
    readonly currencies: ReadonlyArray<string>;
    readonly id: string;
    readonly locale: string;
    readonly name: string;
    readonly netWorthGoal: string;
  };
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
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
          "name": "name",
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
          "name": "netWorthGoal",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locale",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "d5147890976337e6fe19aa44354e23a3";

export default node;
