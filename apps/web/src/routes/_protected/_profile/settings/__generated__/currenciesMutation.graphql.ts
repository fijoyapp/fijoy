/**
 * @generated SignedSource<<2a0b4e289aa741bc4a5bd9ba1fd6ac5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type currenciesMutation$variables = {
  currencies: ReadonlyArray<string>;
  id: string;
};
export type currenciesMutation$data = {
  readonly updateProfile: {
    readonly " $fragmentSpreads": FragmentRefs<"profilesFragment">;
  };
};
export type currenciesMutation = {
  response: currenciesMutation$data;
  variables: currenciesMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "currencies"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "currencies",
        "variableName": "currencies"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "currenciesMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "updateProfile",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "profilesFragment"
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
    "name": "currenciesMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "updateProfile",
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
            "name": "currencies",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locale",
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
            "name": "netWorthGoal",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2a658b91b95e5b18bb2795fa0b3793b3",
    "id": null,
    "metadata": {},
    "name": "currenciesMutation",
    "operationKind": "mutation",
    "text": "mutation currenciesMutation(\n  $id: ID!\n  $currencies: [String!]!\n) {\n  updateProfile(id: $id, input: {currencies: $currencies}) {\n    ...profilesFragment\n    id\n  }\n}\n\nfragment profilesFragment on Profile {\n  id\n  currencies\n  locale\n  name\n  netWorthGoal\n}\n"
  }
};
})();

(node as any).hash = "3524718ba135d4b0e21e8166c17cdb78";

export default node;
