/**
 * @generated SignedSource<<72e8b282f422f0c6782b517c7e4c2c1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeQuery$variables = Record<PropertyKey, never>;
export type routeQuery$data = {
  readonly profile: {
    readonly " $fragmentSpreads": FragmentRefs<"routeFragment">;
  };
};
export type routeQuery = {
  response: routeQuery$data;
  variables: routeQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profile",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "routeFragment"
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
    "name": "routeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8e7a44a6b056845055acc044a23e6df4",
    "id": null,
    "metadata": {},
    "name": "routeQuery",
    "operationKind": "query",
    "text": "query routeQuery {\n  profile {\n    ...routeFragment\n    id\n  }\n}\n\nfragment routeFragment on Profile {\n  id\n}\n"
  }
};

(node as any).hash = "43134c811925d3ee7177e0c64d0abc46";

export default node;
