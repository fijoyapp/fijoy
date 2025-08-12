/**
 * @generated SignedSource<<41ea6cb1cff415f358777176936a9866>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
export type AccountInvestmentType = "fhsa" | "non_investment" | "rrsp" | "taxable" | "tfsa" | "%future added value";
export type AccountTickerType = "crypto" | "currency" | "stock" | "%future added value";
export type CreateAccountInput = {
  accountType: AccountAccountType;
  amount: string;
  archived?: boolean | null | undefined;
  createTime?: any | null | undefined;
  currencyCode: string;
  institution: string;
  investmentType: AccountInvestmentType;
  name: string;
  snapshotAccountIDs?: ReadonlyArray<string> | null | undefined;
  ticker: string;
  tickerType: AccountTickerType;
  transactionEntryIDs?: ReadonlyArray<string> | null | undefined;
  updateTime?: any | null | undefined;
};
export type newAccountLiquidityMutation$variables = {
  accountConnections: ReadonlyArray<string>;
  input: CreateAccountInput;
  transactionConnections: ReadonlyArray<string>;
};
export type newAccountLiquidityMutation$data = {
  readonly createAccount: {
    readonly accountEdge: {
      readonly node: {
        readonly accountType: AccountAccountType;
        readonly amount: string;
        readonly balance: string;
        readonly currencyCode: string;
        readonly id: string;
        readonly institution: string;
        readonly name: string;
        readonly value: string;
      } | null | undefined;
    };
    readonly transactionEdge: {
      readonly node: {
        readonly createTime: any;
        readonly id: string;
        readonly note: string | null | undefined;
      } | null | undefined;
    };
  };
};
export type newAccountLiquidityMutation = {
  response: newAccountLiquidityMutation$data;
  variables: newAccountLiquidityMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "accountConnections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "transactionConnections"
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountEdge",
  "kind": "LinkedField",
  "name": "accountEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v4/*: any*/),
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
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "TransactionEdge",
  "kind": "LinkedField",
  "name": "transactionEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Transaction",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "note",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "newAccountLiquidityMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateAccountResponse",
        "kind": "LinkedField",
        "name": "createAccount",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "newAccountLiquidityMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateAccountResponse",
        "kind": "LinkedField",
        "name": "createAccount",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "accountEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "accountConnections"
              }
            ]
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "transactionEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "transactionConnections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5c43f3d41d33c553ea6265236b9cdf44",
    "id": null,
    "metadata": {},
    "name": "newAccountLiquidityMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountLiquidityMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    accountEdge {\n      node {\n        id\n        name\n        accountType\n        balance\n        institution\n        value\n        currencyCode\n        amount\n      }\n    }\n    transactionEdge {\n      node {\n        id\n        createTime\n        note\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1abab751c4ad430af1b0bfacc3fc255c";

export default node;
