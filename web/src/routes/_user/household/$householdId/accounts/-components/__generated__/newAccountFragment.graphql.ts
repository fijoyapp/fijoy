/**
 * @generated SignedSource<<092126b521ad7d4805419e9deb11a1b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newAccountFragment$data = {
  readonly accounts: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "newAccountFragment";
};
export type newAccountFragment$key = {
  readonly " $data"?: newAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newAccountFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "accounts",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "76027f6a362588b1c82f86949732bae4";

export default node;
