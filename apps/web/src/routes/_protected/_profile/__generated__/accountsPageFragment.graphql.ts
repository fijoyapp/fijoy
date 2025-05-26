/**
 * @generated SignedSource<<b74dc1505292a76cacffc6800f31df7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type accountsPageFragment$data = {
  readonly accounts: ReadonlyArray<{
    readonly accountType: AccountAccountType;
    readonly balance: string;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"cardFragment">;
  }>;
  readonly " $fragmentType": "accountsPageFragment";
};
export type accountsPageFragment$key = {
  readonly " $data"?: accountsPageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountsPageFragment">;
};

import AccountsPageRefetch_graphql from './AccountsPageRefetch.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": AccountsPageRefetch_graphql
    }
  },
  "name": "accountsPageFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "accounts",
      "plural": true,
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a1ba9ae7a097f15b7423bd6a965fbed1";

export default node;
