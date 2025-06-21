/**
 * @generated SignedSource<<5c476ab5c56d0d396595e6d76ad40a95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountsPageFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsViewFragment">;
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "b4e3f48bb02738a2e62eb47cbf1858b1";

export default node;
