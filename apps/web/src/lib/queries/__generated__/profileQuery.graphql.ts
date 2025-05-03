/**
 * @generated SignedSource<<f0484cc04d0ccb12fe6ab1fa407b9e26>>
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
    readonly currencies: string;
    readonly id: string;
    readonly locale: string;
    readonly netWorthGoal: string;
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "currencies",
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
        "kind": "ScalarField",
        "name": "netWorthGoal",
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
    "cacheID": "6d50a9c1a4a46a8b9522cb7ebdb548c7",
    "id": null,
    "metadata": {},
    "name": "profileQuery",
    "operationKind": "query",
    "text": "query profileQuery {\n  profile {\n    id\n    currencies\n    locale\n    netWorthGoal\n  }\n}\n"
  }
};
})();

(node as any).hash = "441a61ad697ec20f153d684c7667571f";

export default node;
