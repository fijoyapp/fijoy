/**
 * @generated SignedSource<<a46af84f3f1c7a19297d11d91660ddd4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type investmentsPanelFragment$data = {
  readonly households: ReadonlyArray<{
    readonly currency: {
      readonly code: string;
    };
    readonly id: string;
  }>;
  readonly investments: ReadonlyArray<{
    readonly account: {
      readonly id: string;
      readonly name: string;
    };
    readonly amount: string;
    readonly id: string;
    readonly name: string;
    readonly value: string;
    readonly valueInHouseholdCurrency: string;
    readonly " $fragmentSpreads": FragmentRefs<"investmentCardFragment">;
  }>;
  readonly " $fragmentType": "investmentsPanelFragment";
};
export type investmentsPanelFragment$key = {
  readonly " $data"?: investmentsPanelFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"investmentsPanelFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "investmentsPanelFragment",
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
      "concreteType": "Investment",
      "kind": "LinkedField",
      "name": "investments",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "valueInHouseholdCurrency",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "account",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "investmentCardFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "34452dca1c9d9640cd58f93e2ff9a452";

export default node;
