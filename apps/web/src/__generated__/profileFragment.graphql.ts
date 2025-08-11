/**
 * @generated SignedSource<<983be3202911fa1259fd0812d8ce6c31>>
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "db0152f260d9cf2e42190bba6335b3a9";

export default node;
