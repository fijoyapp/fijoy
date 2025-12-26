/**
 * @generated SignedSource<<7cefbe728394f3f5f45c0f58fff1d1d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountBalanceDisplayFragment_account$data = {
  readonly balance: string;
  readonly currency: {
    readonly code: string;
  };
  readonly " $fragmentType": "accountBalanceDisplayFragment_account";
};
export type accountBalanceDisplayFragment_account$key = {
  readonly " $data"?: accountBalanceDisplayFragment_account$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountBalanceDisplayFragment_account">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountBalanceDisplayFragment_account",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "balance",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Currency",
      "kind": "LinkedField",
      "name": "currency",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d8892fc08ec84cdcde58a37a8762fc43";

export default node;
