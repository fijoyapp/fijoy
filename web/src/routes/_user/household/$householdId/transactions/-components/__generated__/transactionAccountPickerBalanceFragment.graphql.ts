/**
 * @generated SignedSource<<4c570b35c59817a9f9f0f01297520b0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type transactionAccountPickerBalanceFragment$data = {
  readonly balance: string;
  readonly " $fragmentType": "transactionAccountPickerBalanceFragment";
};
export type transactionAccountPickerBalanceFragment$key = {
  readonly " $data"?: transactionAccountPickerBalanceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"transactionAccountPickerBalanceFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "transactionAccountPickerBalanceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "balance",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "97534a20b31c1ac2771447d65b74f39a";

export default node;
