/**
 * @generated SignedSource<<9101db40aefdafb04f0639b69ed44129>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type cardFragment$data = {
  readonly accountType: AccountAccountType;
  readonly amount: string;
  readonly balance: string;
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly updatedAt: any;
  readonly value: string;
  readonly " $fragmentType": "cardFragment";
};
export type cardFragment$key = {
  readonly " $data"?: cardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"cardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "cardFragment",
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
      "name": "value",
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
      "name": "balance",
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
      "name": "symbol",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2075e6391b1f073c4060fd88daf553b2";

export default node;
