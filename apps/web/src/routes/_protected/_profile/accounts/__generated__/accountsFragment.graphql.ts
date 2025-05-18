/**
 * @generated SignedSource<<77504c5bcf1a0ed202947eae16502eea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type accountsFragment$data = ReadonlyArray<{
  readonly accountType: AccountAccountType;
  readonly balance: string;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"cardFragment">;
  readonly " $fragmentType": "accountsFragment";
}>;
export type accountsFragment$key = ReadonlyArray<{
  readonly " $data"?: accountsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountsFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "accountsFragment",
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
      "name": "accountType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "balance",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "cardFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "9f3c51faa4ddb13e3b9c2bfd716d6cf0";

export default node;
