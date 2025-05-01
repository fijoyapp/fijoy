/**
 * @generated SignedSource<<3ceb8f4a48e62cd6c12ee0b8e522999b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routeProfileQuery$variables = Record<PropertyKey, never>;
export type routeProfileQuery$data = {
  readonly profile: {
    readonly id: string;
  };
};
export type routeProfileQuery = {
  response: routeProfileQuery$data;
  variables: routeProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeProfileQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeProfileQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "4cf7ca76df2b66601ecdb3b0c80bdf92",
    "id": null,
    "metadata": {},
    "name": "routeProfileQuery",
    "operationKind": "query",
    "text": "query routeProfileQuery {\n  profile {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d166cd6e813daf3f6ac328f6d90c9d45";

export default node;
