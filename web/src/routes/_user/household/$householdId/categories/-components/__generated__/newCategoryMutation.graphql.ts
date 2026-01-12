/**
 * @generated SignedSource<<d3d6d8c211cc56f7466cf5fa275c4d28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TransactionCategoryType = "expense" | "income" | "investment" | "setup" | "transfer" | "%future added value";
export type CreateCategoryInput = {
  name: string;
  type: TransactionCategoryType;
};
export type newCategoryMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateCategoryInput;
};
export type newCategoryMutation$data = {
  readonly createCategory: {
    readonly node: {
      readonly id: string;
      readonly name: string;
      readonly type: TransactionCategoryType;
    } | null | undefined;
  };
};
export type newCategoryMutation = {
  response: newCategoryMutation$data;
  variables: newCategoryMutation$variables;
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
  "concreteType": "TransactionCategoryEdge",
  "kind": "LinkedField",
  "name": "createCategory",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "TransactionCategory",
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
          "name": "type",
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
    "name": "newCategoryMutation",
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
    "name": "newCategoryMutation",
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createCategory",
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
    "cacheID": "6dc77572763cdca10296a593558fedd2",
    "id": null,
    "metadata": {},
    "name": "newCategoryMutation",
    "operationKind": "mutation",
    "text": "mutation newCategoryMutation(\n  $input: CreateCategoryInput!\n) {\n  createCategory(input: $input) {\n    node {\n      id\n      name\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "58cc0976cb48d7d82687ec89ac72395e";

export default node;
