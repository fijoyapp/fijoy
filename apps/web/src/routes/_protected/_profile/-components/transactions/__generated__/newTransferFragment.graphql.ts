/**
 * @generated SignedSource<<b954f1da262bb26f29c2cfe8f6505e05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newTransferFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"selectAccountFragment">;
  readonly " $fragmentType": "newTransferFragment";
};
export type newTransferFragment$key = {
  readonly " $data"?: newTransferFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newTransferFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newTransferFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "selectAccountFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1853372d0d3a7da827e213ead3690daa";

export default node;
