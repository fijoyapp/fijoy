/**
 * @generated SignedSource<<5dccbbcc977679cdb4237e489bec7f53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TransactionCategoryType = "expense" | "income" | "investment" | "setup" | "transfer" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type categoryCardCategoryFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly type: TransactionCategoryType;
  readonly " $fragmentType": "categoryCardCategoryFragment";
};
export type categoryCardCategoryFragment$key = {
  readonly " $data"?: categoryCardCategoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"categoryCardCategoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "categoryCardCategoryFragment",
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
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "TransactionCategory",
  "abstractKey": null
};

(node as any).hash = "527d574e9273326048b9aa920467fec6";

export default node;
