/**
 * @generated SignedSource<<ff8394623084e3fa6b83a64dd1e9cfc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvestmentsQuery$variables = Record<PropertyKey, never>;
export type InvestmentsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"investmentsPanelFragment">;
};
export type InvestmentsQuery = {
  response: InvestmentsQuery$data;
  variables: InvestmentsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InvestmentsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "investmentsPanelFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InvestmentsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Investment",
        "kind": "LinkedField",
        "name": "investments",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "valueInHouseholdCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
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
              (v0/*: any*/)
            ],
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
    ]
  },
  "params": {
    "cacheID": "f783fde69f5d26ba0e36d9d185edc16f",
    "id": null,
    "metadata": {},
    "name": "InvestmentsQuery",
    "operationKind": "query",
    "text": "query InvestmentsQuery {\n  ...investmentsPanelFragment\n}\n\nfragment investmentCardFragment on Investment {\n  id\n  name\n  symbol\n  updateTime\n  currency {\n    code\n    id\n  }\n  value\n}\n\nfragment investmentsPanelFragment on Query {\n  investments {\n    id\n    name\n    valueInHouseholdCurrency\n    account {\n      name\n      id\n    }\n    ...investmentCardFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "87a3e85037c53e020aae88ec3f471906";

export default node;
