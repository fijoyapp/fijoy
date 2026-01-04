/**
 * @generated SignedSource<<1b56d7e46169a034ad1b88fafc055604>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvestmentType = "crypto" | "stock" | "%future added value";
export type CreateInvestmentInputCustom = {
  costBasis: string;
  input: CreateInvestmentInput;
};
export type CreateInvestmentInput = {
  accountID: string;
  amount?: string | null | undefined;
  name: string;
  symbol: string;
  type: InvestmentType;
};
export type newInvestmentMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateInvestmentInputCustom;
};
export type newInvestmentMutation$data = {
  readonly createInvestment: {
    readonly node: {
      readonly account: {
        readonly id: string;
        readonly name: string;
      };
      readonly id: string;
      readonly name: string;
      readonly valueInHouseholdCurrency: string;
      readonly " $fragmentSpreads": FragmentRefs<"investmentCardFragment">;
    } | null | undefined;
  };
};
export type newInvestmentMutation = {
  response: newInvestmentMutation$data;
  variables: newInvestmentMutation$variables;
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
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "valueInHouseholdCurrency",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v3/*: any*/)
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
    "name": "newInvestmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "InvestmentEdge",
        "kind": "LinkedField",
        "name": "createInvestment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Investment",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "investmentCardFragment"
              }
            ],
            "storageKey": null
          }
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "newInvestmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "InvestmentEdge",
        "kind": "LinkedField",
        "name": "createInvestment",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Investment",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "symbol",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "quote",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updateTime",
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
                "name": "value",
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
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createInvestment",
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
    "cacheID": "b3594289468531bebf25191a4e8dbfaf",
    "id": null,
    "metadata": {},
    "name": "newInvestmentMutation",
    "operationKind": "mutation",
    "text": "mutation newInvestmentMutation(\n  $input: CreateInvestmentInputCustom!\n) {\n  createInvestment(input: $input) {\n    node {\n      id\n      name\n      valueInHouseholdCurrency\n      account {\n        name\n        id\n      }\n      ...investmentCardFragment\n    }\n  }\n}\n\nfragment investmentCardFragment on Investment {\n  id\n  name\n  symbol\n  quote\n  updateTime\n  currency {\n    code\n    id\n  }\n  amount\n  value\n}\n"
  }
};
})();

(node as any).hash = "cf7f5daf8a48fcf3651d2286141f8efd";

export default node;
