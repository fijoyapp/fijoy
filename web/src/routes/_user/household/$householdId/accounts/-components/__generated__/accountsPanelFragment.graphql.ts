/**
 * @generated SignedSource<<f2f4569ecbceabcedd5c5f26a0c5f2b7>>
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
  readonly households: ReadonlyArray<{
    readonly currency: {
      readonly code: string;
    };
    readonly id: string;
  }>;
  readonly " $fragmentType": "accountsPanelFragment";
};
export type accountsPanelFragment$key = {
  readonly " $data"?: accountsPanelFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountsPanelFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountsPanelFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Household",
      "kind": "LinkedField",
      "name": "households",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "accounts",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
})();

(node as any).hash = "de00a7072af2a4e4ab54dc8cd84d2015";

export default node;
