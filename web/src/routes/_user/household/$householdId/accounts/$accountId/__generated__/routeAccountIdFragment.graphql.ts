/**
 * @generated SignedSource<<2b216957ebd69ca5790148775c27c977>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeAccountIdFragment$data = {
  readonly archived: boolean;
  readonly id: string;
  readonly " $fragmentType": "routeAccountIdFragment";
};
export type routeAccountIdFragment$key = {
  readonly " $data"?: routeAccountIdFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"routeAccountIdFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "routeAccountIdFragment",
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
      "name": "archived",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "48ed5144d5b701c6508979d5c4914492";

export default node;
