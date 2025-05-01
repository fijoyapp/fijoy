/**
 * @generated SignedSource<<faf852338dbb17d4e2eab23d1077267e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type profileQuery$variables = Record<PropertyKey, never>;
export type profileQuery$data = {
  readonly profile: {
    readonly id: string;
  };
};
export type profileQuery = {
  response: profileQuery$data;
  variables: profileQuery$variables;
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
    "name": "profileQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "profileQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "39416c0225637122c1cd904bd92dc7d5",
    "id": null,
    "metadata": {},
    "name": "profileQuery",
    "operationKind": "query",
    "text": "query profileQuery {\n  profile {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "602e61a3c654bf1748104b56d16c948e";

export default node;
