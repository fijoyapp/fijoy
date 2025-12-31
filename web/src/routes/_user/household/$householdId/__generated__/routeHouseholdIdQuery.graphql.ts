/**
 * @generated SignedSource<<491544d8c61252a66b888e511085a4db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
  readonly " $fragmentSpreads": FragmentRefs<"teamSwitcherFragment">;
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
v1 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeHouseholdIdQuery",
    "selections": [
      (v1/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "teamSwitcherFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeHouseholdIdQuery",
    "selections": [
      (v1/*: any*/)
    ]
  },
  "params": {
    "cacheID": "0a20be63d6771e0bd4034f7dc90f28c3",
    "id": null,
    "metadata": {},
    "name": "routeHouseholdIdQuery",
    "operationKind": "query",
    "text": "query routeHouseholdIdQuery {\n  households {\n    id\n    name\n    locale\n    currency {\n      id\n      code\n    }\n  }\n  ...teamSwitcherFragment\n}\n\nfragment teamSwitcherFragment on Query {\n  households {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "11beba9724655e6d0c4da8742ffb7403";

export default node;
