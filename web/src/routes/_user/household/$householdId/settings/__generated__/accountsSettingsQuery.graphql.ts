/**
 * @generated SignedSource<<774e2637c9d28c8bc71c52763bb6c3ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountsSettingsQuery$variables = Record<PropertyKey, never>;
export type accountsSettingsQuery$data = {
  readonly household: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"accountSettingsFragment">;
};
export type accountsSettingsQuery = {
  response: accountsSettingsQuery$data;
  variables: accountsSettingsQuery$variables;
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
  "name": "household",
  "plural": false,
  "selections": [
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
    "name": "accountsSettingsQuery",
    "selections": [
      (v1/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "accountSettingsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "accountsSettingsQuery",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "where",
            "value": {
              "archived": true
            }
          }
        ],
        "concreteType": "AccountConnection",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v2/*: any*/),
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
                    "name": "archived",
                    "storageKey": null
                  },
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
                    "concreteType": "HouseholdCurrency",
                    "kind": "LinkedField",
                    "name": "householdCurrency",
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "accounts(where:{\"archived\":true})"
      }
    ]
  },
  "params": {
    "cacheID": "85222acbf6f8a29b7f8418b0e9f6590d",
    "id": null,
    "metadata": {},
    "name": "accountsSettingsQuery",
    "operationKind": "query",
    "text": "query accountsSettingsQuery {\n  household {\n    id\n  }\n  ...accountSettingsFragment\n}\n\nfragment accountSettingsFragment on Query {\n  accounts(where: {archived: true}) {\n    edges {\n      node {\n        id\n        name\n        type\n        archived\n        user {\n          name\n          id\n        }\n        householdCurrency {\n          code\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8857808cb637b364f0dff4acc45fdda1";

export default node;
