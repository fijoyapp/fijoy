/**
 * @generated SignedSource<<196a02e4dd2d712aa23ccf78dcdcc074>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type householdIdQuery$variables = Record<PropertyKey, never>;
export type householdIdQuery$data = {
  readonly households: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type householdIdQuery = {
  response: householdIdQuery$data;
  variables: householdIdQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Household",
    "kind": "LinkedField",
    "name": "households",
    "plural": true,
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
    "name": "householdIdQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "householdIdQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8ef1e172a7a1a2373865c68fb8b6d917",
    "id": null,
    "metadata": {},
    "name": "householdIdQuery",
    "operationKind": "query",
    "text": "query householdIdQuery {\n  households {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "01d690bf25b270fe42830b42a8278e9d";

export default node;
