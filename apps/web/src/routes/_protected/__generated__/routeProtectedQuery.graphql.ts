/**
 * @generated SignedSource<<65d94cdc4a977085a0b536d42fc70e17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeProtectedQuery$variables = {
  hasProfile: boolean;
};
export type routeProtectedQuery$data = {
  readonly currencies: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"currencyFragment">;
  }>;
  readonly profiles: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"profilesFragment">;
  }>;
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"userFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"accountsPageFragment" | "profileFragment" | "transactionsPageFragment">;
};
export type routeProtectedQuery = {
  response: routeProtectedQuery$data;
  variables: routeProtectedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasProfile"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencies",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locale",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "netWorthGoal",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routeProtectedQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "user",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "userFragment"
            }
          ],
          "storageKey": null
        },
        "action": "THROW"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profiles",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "profilesFragment"
          }
        ],
        "storageKey": null
      },
      {
        "condition": "hasProfile",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "profileFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "accountsPageFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "transactionsPageFragment"
          }
        ]
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Currency",
        "kind": "LinkedField",
        "name": "currencies",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "currencyFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "routeProtectedQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profiles",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "condition": "hasProfile",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v4/*: any*/),
              (v2/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
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
                      (v1/*: any*/),
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
                        "name": "balance_in_default_currency",
                        "storageKey": null
                      },
                      (v4/*: any*/),
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
                        "name": "currencyCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "amount",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "tickerType",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "accounts(first:1000)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "AccountsDataTable_accounts",
            "kind": "LinkedHandle",
            "name": "accounts"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "symbol",
                "value": ""
              }
            ],
            "concreteType": "AssetInfo",
            "kind": "LinkedField",
            "name": "assetInfo",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currency",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "exchange",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentPrice",
                "storageKey": null
              }
            ],
            "storageKey": "assetInfo(symbol:\"\")"
          },
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": "TransactionConnection",
            "kind": "LinkedField",
            "name": "transactions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TransactionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Transaction",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "note",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createTime",
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "transactions(first:20)"
          },
          {
            "alias": null,
            "args": (v10/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "TransactionsDataTable_transactions",
            "kind": "LinkedHandle",
            "name": "transactions"
          }
        ]
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Currency",
        "kind": "LinkedField",
        "name": "currencies",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6398774728295dee7663c085c578330b",
    "id": null,
    "metadata": {},
    "name": "routeProtectedQuery",
    "operationKind": "query",
    "text": "query routeProtectedQuery(\n  $hasProfile: Boolean!\n) {\n  user {\n    ...userFragment\n    id\n  }\n  profiles {\n    ...profilesFragment\n    id\n  }\n  ...profileFragment @include(if: $hasProfile)\n  ...accountsPageFragment @include(if: $hasProfile)\n  ...transactionsPageFragment @include(if: $hasProfile)\n  currencies {\n    ...currencyFragment\n  }\n}\n\nfragment accountsDataTableFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        name\n        accountType\n        balance\n        balance_in_default_currency\n        institution\n        value\n        currencyCode\n        amount\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment accountsPageFragment on Query {\n  ...accountsViewFragment\n  ...addAccountFragment\n}\n\nfragment accountsViewFragment on Query {\n  ...netWorthInfoFragment\n  ...accountsDataTableFragment\n}\n\nfragment addAccountFragment on Query {\n  ...newAccountInvestmentFragment\n}\n\nfragment currencyFragment on Currency {\n  code\n  locale\n}\n\nfragment netWorthInfoFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        accountType\n        balance_in_default_currency\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment newAccountInvestmentFragment on Query {\n  assetInfo(symbol: \"\") {\n    name\n    currency\n    exchange\n    currentPrice\n  }\n}\n\nfragment newExpenseFragment on Query {\n  ...selectAccountFragment\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        currencyCode\n      }\n    }\n  }\n}\n\nfragment newIncomeFragment on Query {\n  ...selectAccountFragment\n}\n\nfragment newTransferFragment on Query {\n  ...selectAccountFragment\n}\n\nfragment profileFragment on Query {\n  profile {\n    id\n    name\n    currencies\n    netWorthGoal\n    locale\n  }\n}\n\nfragment profilesFragment on Profile {\n  id\n  currencies\n  locale\n  name\n  netWorthGoal\n}\n\nfragment selectAccountFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        name\n        amount\n        currencyCode\n        tickerType\n      }\n    }\n  }\n}\n\nfragment transactionDataTableFragment on Query {\n  transactions(first: 20) {\n    edges {\n      node {\n        id\n        note\n        createTime\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment transactionsPageFragment on Query {\n  ...transactionDataTableFragment\n  ...newExpenseFragment\n  ...newIncomeFragment\n  ...newTransferFragment\n}\n\nfragment userFragment on User {\n  id\n  email\n}\n"
  }
};
})();

(node as any).hash = "268864a28380dc7cdd71408560bb8d7f";

export default node;
