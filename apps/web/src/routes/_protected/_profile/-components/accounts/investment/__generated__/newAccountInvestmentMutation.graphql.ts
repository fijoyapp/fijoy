/**
 * @generated SignedSource<<7d7c3324f729988d9d8f712ddc9c6a37>>
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
  investmentType: AccountInvestmentType;
  lmao: string;
  name: string;
  ticker: string;
  tickerType: AccountTickerType;
  transactionEntryIDs?: ReadonlyArray<string> | null | undefined;
  updateTime?: any | null | undefined;
};
export type newAccountInvestmentMutation$variables = {
  input: CreateAccountInput;
};
export type newAccountInvestmentMutation$data = {
  readonly createAccount: {
    readonly id: string;
  };
};
export type newAccountInvestmentMutation = {
  response: newAccountInvestmentMutation$data;
  variables: newAccountInvestmentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "createAccount",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newAccountInvestmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newAccountInvestmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2adb089283da0d470bef6ab7b42f7c45",
    "id": null,
    "metadata": {},
    "name": "newAccountInvestmentMutation",
    "operationKind": "mutation",
    "text": "mutation newAccountInvestmentMutation(\n  $input: CreateAccountInput!\n) {\n  createAccount(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fa5912c04bc9610686c35db724f2c5d1";

export default node;
