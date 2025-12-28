/**
 * @generated SignedSource<<f737d9416e6d7d1e2ca148fc93a07f62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type accountCardFragment$data = {
  readonly balance: string;
  readonly currency: {
    readonly code: string;
  };
  readonly id: string;
  readonly name: string;
  readonly type: AccountType;
  readonly updateTime: any;
  readonly " $fragmentSpreads": FragmentRefs<"accountBalanceDisplayFragment_account">;
  readonly " $fragmentType": "accountCardFragment";
};
export type accountCardFragment$key = {
  readonly " $data"?: accountCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountCardFragment",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Currency",
      "kind": "LinkedField",
      "name": "currency",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
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
      "name": "accountBalanceDisplayFragment_account"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "27e82c4bb9a717ffda9366dcb70d640c";

export default node;
