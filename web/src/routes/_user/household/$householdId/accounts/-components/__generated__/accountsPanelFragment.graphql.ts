/**
 * @generated SignedSource<<6895cfdc2006484aa2ce07bc4f503fc4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type accountsPanelFragment$data = {
  readonly accounts: ReadonlyArray<{
    readonly balanceInHouseholdCurrency: string;
    readonly id: string;
    readonly type: AccountType;
    readonly " $fragmentSpreads": FragmentRefs<"accountCardFragment">;
  }>;
  readonly " $fragmentType": "accountsPanelFragment";
};
export type accountsPanelFragment$key = {
  readonly " $data"?: accountsPanelFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountsPanelFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountsPanelFragment",
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

(node as any).hash = "8a13e9d897ac83288aa8db5d8ad0e743";

export default node;
