/**
 * @generated SignedSource<<b9a915635e502d422d4344aef7b36520>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountsPageRefetch$variables = Record<PropertyKey, never>;
export type AccountsPageRefetch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsPageFragment">;
};
export type AccountsPageRefetch = {
  response: AccountsPageRefetch$data;
  variables: AccountsPageRefetch$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountsPageRefetch",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "accountsPageFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountsPageRefetch",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 1000
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
                    "name": "accountType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "balance",
                    "storageKey": null
                  },
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
                    "name": "institution",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "currencySymbol",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "amount",
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
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "accounts(first:1000)"
      }
    ]
  },
  "params": {
    "cacheID": "675bd70f84e65c8e1ccbc270b3a5288b",
    "id": null,
    "metadata": {},
    "name": "AccountsPageRefetch",
    "operationKind": "query",
    "text": "query AccountsPageRefetch {\n  ...accountsPageFragment\n}\n\nfragment accountDataTableFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        name\n        accountType\n        balance\n        institution\n        value\n        currencySymbol\n        amount\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment accountsPageFragment on Query {\n  ...accountsViewFragment\n}\n\nfragment accountsViewFragment on Query {\n  ...netWorthInfoFragment\n  ...accountDataTableFragment\n}\n\nfragment netWorthInfoFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        accountType\n        balance\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n"
  }
};

(node as any).hash = "b4e3f48bb02738a2e62eb47cbf1858b1";

export default node;
