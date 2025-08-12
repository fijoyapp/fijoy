/**
 * @generated SignedSource<<00e0d56ae93a380bf5be40cff384fd41>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewAccountInvestmentRefetchQuery$variables = {
  symbol?: string | null | undefined;
};
export type NewAccountInvestmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newAccountInvestmentFragment">;
};
export type NewAccountInvestmentRefetchQuery = {
  response: NewAccountInvestmentRefetchQuery$data;
  variables: NewAccountInvestmentRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": "",
    "kind": "LocalArgument",
    "name": "symbol"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "symbol",
    "variableName": "symbol"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewAccountInvestmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "newAccountInvestmentFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewAccountInvestmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AssetInfo",
        "kind": "LinkedField",
        "name": "assetInfo",
        "plural": false,
        "selections": [
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "38301dc29fc998cbdf2a70573079105a",
    "id": null,
    "metadata": {},
    "name": "NewAccountInvestmentRefetchQuery",
    "operationKind": "query",
    "text": "query NewAccountInvestmentRefetchQuery(\n  $symbol: String = \"\"\n) {\n  ...newAccountInvestmentFragment_3astM6\n}\n\nfragment newAccountInvestmentFragment_3astM6 on Query {\n  assetInfo(symbol: $symbol) {\n    name\n    currency\n    exchange\n    currentPrice\n  }\n}\n"
  }
};
})();

(node as any).hash = "db82d2d06ae42adf7b217e8304d9f17a";

export default node;
