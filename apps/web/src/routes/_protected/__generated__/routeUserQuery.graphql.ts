/**
 * @generated SignedSource<<d5bf175b61f74775210028dea888a966>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routeUserQuery$variables = Record<PropertyKey, never>;
export type routeUserQuery$data = {
  readonly profile: {
    readonly id: string;
  };
};
export type routeUserQuery = {
  response: routeUserQuery$data;
  variables: routeUserQuery$variables;
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
    "name": "routeUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "98dca6c47e7787dca823b5fa4a722745",
    "id": null,
    "metadata": {},
    "name": "routeUserQuery",
    "operationKind": "query",
    "text": "query routeUserQuery {\n  profile {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0fa9949a7d87f04b71243216140c03de";

export default node;
