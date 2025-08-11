/**
 * @generated SignedSource<<fee4bddb4ad0c4b9fd126e7a62ae7d67>>
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
export type newAccountLiquidityMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateAccountInput;
};
export type newAccountLiquidityMutation$data = {
  readonly createAccount: {
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
};
export type newAccountLiquidityMutation = {
  response: newAccountLiquidityMutation$data;
  variables: newAccountLiquidityMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "AccountEdge",
  "kind": "LinkedField",
  "name": "createAccount",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "newAccountLiquidityMutation",
    "selections": [
      (v3/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "newAccountLiquidityMutation",
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createAccount",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "6c4a16fc8d185df4865ae0cef397e3dd",
    "id": null,
    "metadata": {},
    "name": "newAccountLiquidityMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountLiquidityMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    node {\n      id\n      name\n      accountType\n      balance\n      institution\n      value\n      currencySymbol\n      amount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e6901bd332c0323b8954ea1f73bac70";

export default node;
