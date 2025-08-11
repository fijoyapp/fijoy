/**
 * @generated SignedSource<<f6552ff3155802abe682cf4552573d52>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userFragment$data = {
  readonly email: string;
  readonly id: string;
  readonly " $fragmentType": "userFragment";
};
export type userFragment$key = {
  readonly " $data"?: userFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"userFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userFragment",
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
      "name": "email",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "1cbc41518b47fc2f876a0a8d6c8e153d";

export default node;
