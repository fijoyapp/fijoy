/**
 * @generated SignedSource<<3f6968d01b3b769358b3cbb46afef4bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountsViewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountDataTableFragment" | "netWorthInfoFragment">;
  readonly " $fragmentType": "accountsViewFragment";
};
export type accountsViewFragment$key = {
  readonly " $data"?: accountsViewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountsViewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountsViewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "netWorthInfoFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "accountDataTableFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "cc95724795ec53296ac9f889469cb167";

export default node;
