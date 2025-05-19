/**
 * @generated SignedSource<<30a5768cf589e4aae34fa1df64536e42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeProtectedQuery$variables = Record<PropertyKey, never>;
export type routeProtectedQuery$data = {
  readonly currencies: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"currencyFragment">;
  }>;
  readonly profiles: ReadonlyArray<{
    readonly currencies: string;
    readonly id: string;
    readonly locale: string;
  }>;
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"userFragment">;
  };
};
export type routeProtectedQuery = {
  response: routeProtectedQuery$data;
  variables: routeProtectedQuery$variables;
};

const node: ConcreteRequest = (function(){
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
  "name": "locale",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Profile",
  "kind": "LinkedField",
  "name": "profiles",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencies",
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeProtectedQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "userFragment"
          }
        ],
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Currency",
        "kind": "LinkedField",
        "name": "currencies",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "currencyFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeProtectedQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Currency",
        "kind": "LinkedField",
        "name": "currencies",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f21be8ed2a84d6d3d3352a7882d32d8e",
    "id": null,
    "metadata": {},
    "name": "routeProtectedQuery",
    "operationKind": "query",
    "text": "query routeProtectedQuery {\n  user {\n    ...userFragment\n    id\n  }\n  profiles {\n    id\n    currencies\n    locale\n  }\n  currencies {\n    ...currencyFragment\n  }\n}\n\nfragment currencyFragment on Currency {\n  code\n  locale\n}\n\nfragment userFragment on User {\n  id\n}\n"
  }
};
})();

(node as any).hash = "fcc78668be476b0acbab4f9f0ab7cf6a";

export default node;
