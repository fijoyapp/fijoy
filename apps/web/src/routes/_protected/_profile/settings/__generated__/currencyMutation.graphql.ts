/**
 * @generated SignedSource<<6739408e04da3b26eac19d2e48b6bd63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type currencyMutation$variables = {
  currencies: ReadonlyArray<string>;
  id: string;
};
export type currencyMutation$data = {
  readonly updateProfile: {
    readonly " $fragmentSpreads": FragmentRefs<"profileFragment">;
  };
};
export type currencyMutation = {
  response: currencyMutation$data;
  variables: currencyMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "currencies"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "currencies",
        "variableName": "currencies"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "currencyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "updateProfile",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "profileFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "currencyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "updateProfile",
        "plural": false,
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
            "name": "currencies",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locale",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "netWorthGoal",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e1cf23eb6b2b744b9e6513d774c219b7",
    "id": null,
    "metadata": {},
    "name": "currencyMutation",
    "operationKind": "mutation",
    "text": "mutation currencyMutation(\n  $id: ID!\n  $currencies: [String!]!\n) {\n  updateProfile(id: $id, input: {currencies: $currencies}) {\n    ...profileFragment\n    id\n  }\n}\n\nfragment profileFragment on Profile {\n  id\n  currencies\n  locale\n  netWorthGoal\n}\n"
  }
};
})();

(node as any).hash = "57f2d55ad1b3f3367bb98735fc1dddcd";

export default node;
