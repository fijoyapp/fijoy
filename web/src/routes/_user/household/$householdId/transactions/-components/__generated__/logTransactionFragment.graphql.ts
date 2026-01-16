/**
 * @generated SignedSource<<39b9a3980ca88b5d6b9ba507ddb6e82d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type logTransactionFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newBuyFragment" | "newExpenseFragment" | "newIncomeFragment" | "newMoveFragment" | "newSellFragment" | "newTransferFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "newMoveFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "35728377a7067f01cc6ca825662458c3";

export default node;
