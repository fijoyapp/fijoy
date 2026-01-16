/**
 * @generated SignedSource<<d5061058ad09bb6de0120ffd28090826>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type logTransactionFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newBuyFragment" | "newExpenseFragment" | "newIncomeFragment" | "newSellFragment" | "newTransferFragment">;
  readonly " $fragmentType": "logTransactionFragment";
};
export type logTransactionFragment$key = {
  readonly " $data"?: logTransactionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"logTransactionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "logTransactionFragment",
  "selections": [
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "newBuyFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "newSellFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1396898fae29260af5c086db86c18925";

export default node;
