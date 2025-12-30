/**
 * @generated SignedSource<<0388bc68baeb946039380b7f98b300ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newAccountFragment$data = {
  readonly currencies: ReadonlyArray<{
    readonly code: string;
    readonly id: string;
  }>;
  readonly households: ReadonlyArray<{
    readonly currency: {
      readonly code: string;
      readonly id: string;
    };
    readonly id: string;
  }>;
  readonly " $fragmentType": "newAccountFragment";
};
export type newAccountFragment$key = {
  readonly " $data"?: newAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newAccountFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "code",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newAccountFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Currency",
      "kind": "LinkedField",
      "name": "currencies",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
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
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "a800a23a3dc6ef55276b6e6e98f95279";

export default node;
