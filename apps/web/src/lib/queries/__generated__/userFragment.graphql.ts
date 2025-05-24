/**
 * @generated SignedSource<<654fd1a1931b275df19af45e4d9bb275>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userFragment$data = {
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "6801c142dd103f3629498cc3cc2d799b";

export default node;
