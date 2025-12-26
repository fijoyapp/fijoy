/**
 * @generated SignedSource<<4c528baa52a77d896ab8dfd32134cf46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type accountsListPageFragment$data = {
  readonly accounts: ReadonlyArray<{
    readonly balanceInHouseholdCurrency: string;
    readonly id: string;
    readonly type: AccountType;
    readonly " $fragmentSpreads": FragmentRefs<"accountCardFragment">;
  }>;
  readonly " $fragmentType": "accountsListPageFragment";
};
export type accountsListPageFragment$key = {
  readonly " $data"?: accountsListPageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountsListPageFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountsListPageFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "accounts",
      "plural": true,
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
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "balanceInHouseholdCurrency",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "accountCardFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "36a42f648b2bf2685e694f8b02a4af97";

export default node;
