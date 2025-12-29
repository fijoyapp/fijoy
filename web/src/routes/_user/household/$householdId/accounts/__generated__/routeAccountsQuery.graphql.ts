/**
 * @generated SignedSource<<6eb6a95e9f42a23e7fb424812975fa94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeAccountsQuery$variables = Record<PropertyKey, never>;
export type routeAccountsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsPanelFragment">;
};
export type routeAccountsQuery = {
  response: routeAccountsQuery$data;
  variables: routeAccountsQuery$variables;
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
  "concreteType": "Currency",
  "kind": "LinkedField",
  "name": "currency",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeAccountsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "accountsPanelFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAccountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Household",
        "kind": "LinkedField",
        "name": "households",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "valueInHouseholdCurrency",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "iconPath",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updateTime",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bd7937437e5048acec3c1f395e5cfcdd",
    "id": null,
    "metadata": {},
    "name": "routeAccountsQuery",
    "operationKind": "query",
    "text": "query routeAccountsQuery {\n  ...accountsPanelFragment\n}\n\nfragment accountCardFragment on Account {\n  id\n  name\n  type\n  iconPath\n  updateTime\n  currency {\n    code\n    id\n  }\n  user {\n    name\n    id\n  }\n  value\n}\n\nfragment accountsPanelFragment on Query {\n  households {\n    id\n    currency {\n      code\n      id\n    }\n  }\n  accounts {\n    id\n    type\n    valueInHouseholdCurrency\n    ...accountCardFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "81ba72b4dd01e656e857556d21ab1f9e";

export default node;
