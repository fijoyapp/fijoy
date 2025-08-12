/**
 * @generated SignedSource<<4352103b565c72db93eb3de3ba84f9f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountsPageFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsViewFragment" | "addAccountFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "accountsViewFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "addAccountFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "c25e80970cb989b4b860e0939fa18aea";

export default node;
