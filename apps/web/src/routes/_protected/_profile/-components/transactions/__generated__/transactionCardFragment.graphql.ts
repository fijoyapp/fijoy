/**
 * @generated SignedSource<<fe06e1e1951b5cb45acfc3eddd31c93f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountSymbolType = "crypto" | "currency" | "stock" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type transactionCardFragment$data = {
  readonly account: {
    readonly name: string;
    readonly symbol: string;
    readonly symbolType: AccountSymbolType;
  };
  readonly amount: string;
  readonly createdAt: any;
  readonly datetime: any;
  readonly id: string;
  readonly note: string | null | undefined;
  readonly updatedAt: any;
  readonly " $fragmentType": "transactionCardFragment";
};
export type transactionCardFragment$key = {
  readonly " $data"?: transactionCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"transactionCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "transactionCardFragment",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};

(node as any).hash = "408262bed89a6e0865e57f539324a4f1";

export default node;
