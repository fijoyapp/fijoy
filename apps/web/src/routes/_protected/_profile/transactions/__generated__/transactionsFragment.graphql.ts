/**
 * @generated SignedSource<<ad848d651caffefb0ab953b848f5f608>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountSymbolType = "crypto" | "currency" | "stock" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type transactionsFragment$data = ReadonlyArray<{
  readonly account: {
    readonly symbol: string;
    readonly symbolType: AccountSymbolType;
  };
  readonly amount: string;
  readonly createdAt: any;
  readonly datetime: any;
  readonly id: string;
  readonly note: string | null | undefined;
  readonly updatedAt: any;
  readonly " $fragmentType": "transactionsFragment";
}>;
export type transactionsFragment$key = ReadonlyArray<{
  readonly " $data"?: transactionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"transactionsFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "transactionsFragment",
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
      "name": "note",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "datetime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "account",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "symbol",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "symbolType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};

(node as any).hash = "a30c64c81e957a600ec9f0c26cc8cbeb";

export default node;
