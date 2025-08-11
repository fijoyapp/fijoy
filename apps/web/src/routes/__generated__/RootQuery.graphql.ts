/**
 * @generated SignedSource<<82fe82a3127b7bcf26a36d74e93d6ec2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RootQuery$variables = {
  hasProfile: boolean;
  hasUser: boolean;
};
export type RootQuery$data = {
  readonly currencies: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"currencyFragment">;
  }>;
  readonly profiles?: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"profilesFragment">;
  }>;
  readonly user?: {
    readonly " $fragmentSpreads": FragmentRefs<"userFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"accountsPageFragment" | "profileFragment" | "transactionsPageFragment">;
};
export type RootQuery = {
  response: RootQuery$data;
  variables: RootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasProfile"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasUser"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencies",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locale",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "netWorthGoal",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "balance",
  "storageKey": null
},
v8 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootQuery",
    "selections": [
      {
        "condition": "hasUser",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
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
          }
        ]
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RootQuery",
    "selections": [
      {
        "condition": "hasUser",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ]
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
              (v2/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "accountType",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v5/*: any*/),
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "tickerType",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "accounts(first:1000)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
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
                      (v2/*: any*/),
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
                        "name": "datetime",
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "transactions(first:20)"
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
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "df62a44c94dc8b62e51479a0c77304ae",
    "id": null,
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": "query RootQuery(\n  $hasUser: Boolean!\n  $hasProfile: Boolean!\n) {\n  user @include(if: $hasUser) {\n    ...userFragment\n    id\n  }\n  profiles @include(if: $hasUser) {\n    ...profilesFragment\n    id\n  }\n  ...profileFragment @include(if: $hasProfile)\n  ...accountsPageFragment @include(if: $hasProfile)\n  ...transactionsPageFragment @include(if: $hasProfile)\n  currencies {\n    ...currencyFragment\n  }\n}\n\nfragment accountDataTableFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        name\n        accountType\n        balance\n        institution\n        value\n        currencySymbol\n        amount\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment accountsPageFragment on Query {\n  ...accountsViewFragment\n}\n\nfragment accountsViewFragment on Query {\n  ...netWorthInfoFragment\n  ...accountDataTableFragment\n}\n\nfragment currencyFragment on Currency {\n  code\n  locale\n}\n\nfragment netWorthInfoFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        accountType\n        balance\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment newExpenseFragment on Query {\n  ...selectAccountFragment\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        currencySymbol\n      }\n    }\n  }\n}\n\nfragment newIncomeFragment on Query {\n  ...selectAccountFragment\n}\n\nfragment newTransferFragment on Query {\n  ...selectAccountFragment\n}\n\nfragment profileFragment on Query {\n  profile {\n    id\n    name\n    currencies\n    netWorthGoal\n    locale\n  }\n}\n\nfragment profilesFragment on Profile {\n  id\n  currencies\n  locale\n  name\n  netWorthGoal\n}\n\nfragment selectAccountFragment on Query {\n  accounts(first: 1000) {\n    edges {\n      node {\n        id\n        name\n        amount\n        currencySymbol\n        tickerType\n      }\n    }\n  }\n}\n\nfragment transactionDataTableFragment on Query {\n  transactions(first: 20) {\n    edges {\n      node {\n        id\n        note\n        datetime\n        balance\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment transactionsPageFragment on Query {\n  ...transactionDataTableFragment\n  ...newExpenseFragment\n  ...newIncomeFragment\n  ...newTransferFragment\n}\n\nfragment userFragment on User {\n  id\n  email\n}\n"
  }
};
})();

(node as any).hash = "d53286631806f13dbc6dc2b720ca4fa2";

export default node;
