/**
 * @generated SignedSource<<d081612963376cc1c4a593ce0437f9a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type investmentsPanelFragment$data = {
  readonly investments: ReadonlyArray<{
    readonly account: {
      readonly id: string;
      readonly name: string;
    };
    readonly id: string;
    readonly name: string;
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
          "name": "valueInHouseholdCurrency",
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

(node as any).hash = "9aa2092eee56e3a50cc9be8aafb5afcc";

export default node;
