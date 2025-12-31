/**
 * @generated SignedSource<<f5e83720ac37988164be7fc59e682c2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type teamSwitcherFragment$data = {
  readonly households: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "teamSwitcherFragment";
};
export type teamSwitcherFragment$key = {
  readonly " $data"?: teamSwitcherFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"teamSwitcherFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "teamSwitcherFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Household",
      "kind": "LinkedField",
      "name": "households",
      "plural": true,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "ca4a1d9bd0802b4d7736d49bae2eac44";

export default node;
