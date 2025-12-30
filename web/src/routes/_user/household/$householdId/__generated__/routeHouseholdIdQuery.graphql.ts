/**
 * @generated SignedSource<<0245d4420331d69be7f338f871c18d22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routeHouseholdIdQuery$variables = Record<PropertyKey, never>;
export type routeHouseholdIdQuery$data = {
  readonly households: ReadonlyArray<{
    readonly currency: {
      readonly code: string;
      readonly id: string;
    };
    readonly id: string;
    readonly locale: string;
    readonly name: string;
  }>;
};
export type routeHouseholdIdQuery = {
  response: routeHouseholdIdQuery$data;
  variables: routeHouseholdIdQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Household",
    "kind": "LinkedField",
    "name": "households",
    "plural": true,
    "selections": [
      (v0/*: any*/),
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
        "name": "locale",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Currency",
        "kind": "LinkedField",
        "name": "currency",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          }
        ],
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
    "name": "routeHouseholdIdQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeHouseholdIdQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a76f93585434ee4ff300b17106dc1c3b",
    "id": null,
    "metadata": {},
    "name": "routeHouseholdIdQuery",
    "operationKind": "query",
    "text": "query routeHouseholdIdQuery {\n  households {\n    id\n    name\n    locale\n    currency {\n      id\n      code\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1af32d08e01ab60d6235b679fb78c581";

export default node;
