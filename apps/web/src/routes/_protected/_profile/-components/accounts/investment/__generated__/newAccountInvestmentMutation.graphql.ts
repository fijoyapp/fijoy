/**
 * @generated SignedSource<<3b39bf14c007a8af22d06ab3175ef911>>
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
  currencySymbol: string;
  institution: string;
  investmentType: AccountInvestmentType;
  name: string;
  ticker: string;
  tickerType: AccountTickerType;
  transactionEntryIDs?: ReadonlyArray<string> | null | undefined;
  updateTime?: any | null | undefined;
};
export type newAccountInvestmentMutation$variables = {
  accountConnections: ReadonlyArray<string>;
  input: CreateAccountInput;
  transactionConnections: ReadonlyArray<string>;
};
export type newAccountInvestmentMutation$data = {
  readonly createAccount: {
    readonly accountEdge: {
      readonly node: {
        readonly accountType: AccountAccountType;
        readonly amount: string;
        readonly balance: string;
        readonly currencySymbol: string;
        readonly id: string;
        readonly institution: string;
        readonly name: string;
        readonly value: string;
      } | null | undefined;
    };
    readonly transactionEdge: {
      readonly node: {
        readonly balance: string;
        readonly datetime: any;
        readonly id: string;
        readonly note: string | null | undefined;
      } | null | undefined;
    };
  };
};
export type newAccountInvestmentMutation = {
  response: newAccountInvestmentMutation$data;
  variables: newAccountInvestmentMutation$variables;
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
  "kind": "ScalarField",
  "name": "balance",
  "storageKey": null
},
v6 = {
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
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
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
          "name": "datetime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "note",
          "storageKey": null
        },
        (v5/*: any*/)
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
    "name": "newAccountInvestmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateAccountResponse",
        "kind": "LinkedField",
        "name": "createAccount",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/)
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
    "name": "newAccountInvestmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateAccountResponse",
        "kind": "LinkedField",
        "name": "createAccount",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
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
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
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
    "cacheID": "15d96198d980b1c284b842db38ffc500",
    "id": null,
    "metadata": {},
    "name": "newAccountInvestmentMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountInvestmentMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    accountEdge {\n      node {\n        id\n        name\n        accountType\n        balance\n        institution\n        value\n        currencySymbol\n        amount\n      }\n    }\n    transactionEdge {\n      node {\n        id\n        datetime\n        note\n        balance\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d5d120d3cc581215ea1ee3b1eb17a99f";

export default node;
