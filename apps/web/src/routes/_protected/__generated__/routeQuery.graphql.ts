/**
 * @generated SignedSource<<e85e4109a7a2a39a58e5dbdd94df102c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routeQuery$variables = Record<PropertyKey, never>;
export type routeQuery$data = {
  readonly profile: {
    readonly id: string;
  };
};
export type routeQuery = {
  response: routeQuery$data;
  variables: routeQuery$variables;
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
    "name": "routeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bcbb1bcbbf8241578e6ae271a0fc68b6",
    "id": null,
    "metadata": {},
    "name": "routeQuery",
    "operationKind": "query",
    "text": "query routeQuery {\n  profile {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "cd4586cdd7aa6a9ffe4cb4a656fef9e5";

export default node;
