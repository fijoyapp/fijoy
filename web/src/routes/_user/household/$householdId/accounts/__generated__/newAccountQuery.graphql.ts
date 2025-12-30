/**
 * @generated SignedSource<<74a01c3fda76e151beaf93818d9ad107>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newAccountQuery$variables = Record<PropertyKey, never>;
export type newAccountQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newAccountFragment">;
};
export type newAccountQuery = {
  response: newAccountQuery$data;
  variables: newAccountQuery$variables;
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
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "code",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "newAccountQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "newAccountFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "newAccountQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Currency",
        "kind": "LinkedField",
        "name": "currencies",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
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
            "concreteType": "Currency",
            "kind": "LinkedField",
            "name": "currency",
            "plural": false,
            "selections": (v1/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "930ddfbd0910c9981cf4a69f779cd3f8",
    "id": null,
    "metadata": {},
    "name": "newAccountQuery",
    "operationKind": "query",
    "text": "query newAccountQuery {\n  ...newAccountFragment\n}\n\nfragment newAccountFragment on Query {\n  currencies {\n    id\n    code\n  }\n  households {\n    id\n    currency {\n      id\n      code\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "61249ef108899fcc94a14af055f728e4";

export default node;
