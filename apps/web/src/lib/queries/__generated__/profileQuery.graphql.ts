/**
 * @generated SignedSource<<11b59ce6e459962519a4742aded94286>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type profileQuery$variables = Record<PropertyKey, never>;
export type profileQuery$data = {
  readonly profiles: ReadonlyArray<{
    readonly currencies: string;
    readonly id: string;
    readonly locale: string;
    readonly netWorthGoal: string;
  }>;
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
    "name": "profiles",
    "plural": true,
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
    "cacheID": "b107a21085ab7b34f536fdb896bcacf9",
    "id": null,
    "metadata": {},
    "name": "profileQuery",
    "operationKind": "query",
    "text": "query profileQuery {\n  profiles {\n    id\n    currencies\n    locale\n    netWorthGoal\n  }\n}\n"
  }
};
})();

(node as any).hash = "a4ee917c7a5289552fb8b2ee9669e81c";

export default node;
