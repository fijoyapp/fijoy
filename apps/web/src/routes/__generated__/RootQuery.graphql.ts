/**
 * @generated SignedSource<<88d53150ef1fcb310fc1fc54c15d3410>>
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
    readonly " $fragmentSpreads": FragmentRefs<"profileFragment">;
  }>;
  readonly user?: {
    readonly " $fragmentSpreads": FragmentRefs<"userFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"accountsPageFragment" | "transactionsPageFragment">;
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
  "name": "locale",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "balance",
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
  "name": "value",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencySymbol",
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
                "name": "profileFragment"
              }
            ],
            "storageKey": null
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
      },
      {
        "condition": "hasProfile",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
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
              (v2/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currencies",
                "storageKey": null
              },
              (v3/*: any*/),
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
      },
      {
        "condition": "hasProfile",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 5
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
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "ticker",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "tickerType",
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "updatedAt",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "accounts(first:5)"
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
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "TransactionEntry",
                        "kind": "LinkedField",
                        "name": "transactionEntries",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v7/*: any*/),
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "fxRate",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Account",
                            "kind": "LinkedField",
                            "name": "account",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v8/*: any*/),
                              (v2/*: any*/)
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
              (v9/*: any*/)
            ],
            "storageKey": "transactions(first:20)"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "928b799291aa1195179325cf99800cfa",
    "id": null,
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": "query RootQuery(\n  $hasUser: Boolean!\n  $hasProfile: Boolean!\n) {\n  user @include(if: $hasUser) {\n    ...userFragment\n    id\n  }\n  profiles @include(if: $hasUser) {\n    ...profileFragment\n    id\n  }\n  currencies {\n    ...currencyFragment\n  }\n  ...accountsPageFragment @include(if: $hasProfile)\n  ...transactionsPageFragment @include(if: $hasProfile)\n}\n\nfragment accountDataTableFragment on Query {\n  accounts(first: 5) {\n    edges {\n      node {\n        id\n        name\n        accountType\n        balance\n        currencySymbol\n        amount\n        ...cardFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment accountsPageFragment on Query {\n  ...accountsViewFragment\n}\n\nfragment accountsViewFragment on Query {\n  ...netWorthInfoFragment\n  ...accountDataTableFragment\n}\n\nfragment cardFragment on Account {\n  id\n  name\n  value\n  amount\n  balance\n  accountType\n  ticker\n  tickerType\n  currencySymbol\n  updatedAt\n}\n\nfragment currencyFragment on Currency {\n  code\n  locale\n}\n\nfragment netWorthInfoFragment on Query {\n  accounts(first: 5) {\n    edges {\n      node {\n        id\n        accountType\n        balance\n        ...cardFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment profileFragment on Profile {\n  id\n  currencies\n  locale\n  netWorthGoal\n}\n\nfragment transactionDataTableFragment on Query {\n  transactions(first: 20) {\n    edges {\n      node {\n        id\n        note\n        datetime\n        balance\n        transactionEntries {\n          id\n          amount\n          value\n          fxRate\n          balance\n          account {\n            name\n            currencySymbol\n            id\n          }\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n  }\n}\n\nfragment transactionsPageFragment on Query {\n  ...transactionDataTableFragment\n}\n\nfragment userFragment on User {\n  id\n}\n"
  }
};
})();

(node as any).hash = "f4cde228690eb423396274dcb4cea5e8";

export default node;
