/**
 * @generated SignedSource<<b53d2a70be9750b5ba6c6e0ac254816d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "routeFragment";
};
export type routeFragment$key = {
  readonly " $data"?: routeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"routeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "routeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Profile",
  "abstractKey": null
};

(node as any).hash = "d9378f83a91b73cd924d585671e7b56d";

export default node;
