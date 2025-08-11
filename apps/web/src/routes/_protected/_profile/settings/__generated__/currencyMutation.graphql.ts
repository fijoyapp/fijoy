/**
 * @generated SignedSource<<c0a2c2c43c39cd353480a40483ab62db>>
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
    readonly " $fragmentSpreads": FragmentRefs<"profilesFragment">;
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
            "name": "profilesFragment"
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
            "name": "name",
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
    "cacheID": "c5ac9bff5284d592cef9fb9626ecc2dc",
    "id": null,
    "metadata": {},
    "name": "currencyMutation",
    "operationKind": "mutation",
    "text": "mutation currencyMutation(\n  $id: ID!\n  $currencies: [String!]!\n) {\n  updateProfile(id: $id, input: {currencies: $currencies}) {\n    ...profilesFragment\n    id\n  }\n}\n\nfragment profilesFragment on Profile {\n  id\n  currencies\n  locale\n  name\n  netWorthGoal\n}\n"
  }
};
})();

(node as any).hash = "137400553617cd2506ac4d3bd653b5e6";

export default node;
