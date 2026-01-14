/**
 * @generated SignedSource<<eea284ea1147dc8eeb34ed5d19bb3c9f>>
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
  readonly " $fragmentSpreads": FragmentRefs<"appSidebarFragment" | "newTransactionFragment">;
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Household",
  "kind": "LinkedField",
  "name": "households",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeHouseholdIdQuery",
    "selections": [
      (v3/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "appSidebarFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "newTransactionFragment"
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
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
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
                  (v1/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Currency",
                    "kind": "LinkedField",
                    "name": "currency",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "TransactionCategoryConnection",
        "kind": "LinkedField",
        "name": "transactionCategories",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TransactionCategoryEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TransactionCategory",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e44b91c1896ecb3ddeef25e9a9f8e49c",
    "id": null,
    "metadata": {},
    "name": "routeHouseholdIdQuery",
    "operationKind": "query",
    "text": "query routeHouseholdIdQuery {\n  households {\n    id\n    name\n    locale\n    currency {\n      id\n      code\n    }\n  }\n  ...appSidebarFragment\n  ...newTransactionFragment\n}\n\nfragment appSidebarFragment on Query {\n  ...householdSwitcherFragment\n}\n\nfragment householdSwitcherFragment on Query {\n  households {\n    id\n    name\n  }\n}\n\nfragment newExpenseFragment on Query {\n  accounts {\n    edges {\n      node {\n        id\n        name\n        type\n        currency {\n          code\n          id\n        }\n      }\n    }\n  }\n  transactionCategories {\n    edges {\n      node {\n        id\n        name\n        type\n      }\n    }\n  }\n}\n\nfragment newIncomeFragment on Query {\n  accounts {\n    edges {\n      node {\n        id\n        name\n        type\n        currency {\n          code\n          id\n        }\n      }\n    }\n  }\n  transactionCategories {\n    edges {\n      node {\n        id\n        name\n        type\n      }\n    }\n  }\n}\n\nfragment newTransactionFragment on Query {\n  ...newExpenseFragment\n  ...newIncomeFragment\n  ...newTransferFragment\n}\n\nfragment newTransferFragment on Query {\n  accounts {\n    edges {\n      node {\n        id\n        name\n        type\n        currency {\n          code\n          id\n        }\n      }\n    }\n  }\n  transactionCategories {\n    edges {\n      node {\n        id\n        name\n        type\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0fc5efc3b4d04ef98dc76aed28ea562e";

export default node;
