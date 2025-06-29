/**
 * @generated SignedSource<<6063a50764cbeba2323e3a10dca7d3d2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type transactionsPageFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newTransactionFragment" | "transactionDataTableFragment">;
  readonly " $fragmentType": "transactionsPageFragment";
};
export type transactionsPageFragment$key = {
  readonly " $data"?: transactionsPageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"transactionsPageFragment">;
};

import TransactionsPageRefetch_graphql from './TransactionsPageRefetch.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": TransactionsPageRefetch_graphql
    }
  },
  "name": "transactionsPageFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "transactionDataTableFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "newTransactionFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "5d47ef6ab8c91175963529f3a553485a";

export default node;
