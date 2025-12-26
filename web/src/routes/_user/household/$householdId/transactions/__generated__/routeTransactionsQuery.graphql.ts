/**
 * @generated SignedSource<<861dc5fcf903f146b8ce2823d3552cff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routeTransactionsQuery$variables = Record<PropertyKey, never>;
export type routeTransactionsQuery$data = {
  readonly transactions: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type routeTransactionsQuery = {
  response: routeTransactionsQuery$data;
  variables: routeTransactionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "transactions",
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
    "name": "routeTransactionsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeTransactionsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "100f9799b3d7d6b7206cf62a343a6d35",
    "id": null,
    "metadata": {},
    "name": "routeTransactionsQuery",
    "operationKind": "query",
    "text": "query routeTransactionsQuery {\n  transactions {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "03e72410a2a13d64397d3e1e32a6dd99";

export default node;
