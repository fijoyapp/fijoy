/**
 * @generated SignedSource<<85ff4468b157edec92ed421259b46d97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type navUserFragment$data = {
  readonly self: {
    readonly email: string;
    readonly name: string;
  };
  readonly " $fragmentType": "navUserFragment";
};
export type navUserFragment$key = {
  readonly " $data"?: navUserFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"navUserFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "navUserFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "self",
      "plural": false,
      "selections": [
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
          "name": "email",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1362dcb786de3f6e916b2a879e8f22ce";

export default node;
