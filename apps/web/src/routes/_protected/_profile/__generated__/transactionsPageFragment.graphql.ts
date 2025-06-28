/**
 * @generated SignedSource<<965277202be6b90c861f41d36d8854e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type transactionsPageFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"transactionDataTableFragment">;
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "977a194d8bbfa7e821009b833f47e868";

export default node;
