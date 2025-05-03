/**
 * @generated SignedSource<<e9cfd30f454b30395f0cba6e021e8876>>
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "cardFragment"
    },
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "61340a7ec5b57b9d840ee4b97741e888";

export default node;
