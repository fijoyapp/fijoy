/**
 * @generated SignedSource<<47b56807f5ba527933663c881e2969bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type transactionsPageFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newExpenseFragment" | "newIncomeFragment" | "newTransferFragment" | "transactionDataTableFragment">;
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
      "name": "newExpenseFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "newIncomeFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "newTransferFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "d60e05deab815bae7da9167f3c096a5e";

export default node;
