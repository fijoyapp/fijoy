/**
 * @generated SignedSource<<d1533d822c0d43fb5e61ad14574d3880>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type authQuery$variables = Record<PropertyKey, never>;
export type authQuery$data = {
  readonly user: {
    readonly id: string;
  };
};
export type authQuery = {
  response: authQuery$data;
  variables: authQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
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
    "name": "authQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "authQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "74a50a713f604726c3fd45819fe65040",
    "id": null,
    "metadata": {},
    "name": "authQuery",
    "operationKind": "query",
    "text": "query authQuery {\n  user {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "965a751dbd8a176bfa8a70e07a3ef597";

export default node;
