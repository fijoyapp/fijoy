/**
 * @generated SignedSource<<4049bea27c04e3f6112b536b76adc69e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type currencyFragment$data = ReadonlyArray<{
  readonly code: string;
  readonly locale: string;
  readonly " $fragmentType": "currencyFragment";
}>;
export type currencyFragment$key = ReadonlyArray<{
  readonly " $data"?: currencyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"currencyFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "currencyFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
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
  "type": "Currency",
  "abstractKey": null
};

(node as any).hash = "da867ca481313d55189f7396d0b67b9c";

export default node;
