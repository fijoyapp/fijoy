/**
 * @generated SignedSource<<5874136058c0e4d5856b80e8c3ba84d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TransactionCategoryType = "expense" | "income" | "investment" | "setup" | "transfer" | "%future added value";
export type CreateTransactionCategoryInput = {
  name: string;
  type: TransactionCategoryType;
};
export type newCategoryMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateTransactionCategoryInput;
};
export type newCategoryMutation$data = {
  readonly createTransactionCategory: {
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
  "name": "createTransactionCategory",
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
        "name": "createTransactionCategory",
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
    "cacheID": "281613658fff8e3581d6e82e00361788",
    "id": null,
    "metadata": {},
    "name": "newCategoryMutation",
    "operationKind": "mutation",
    "text": "mutation newCategoryMutation(\n  $input: CreateTransactionCategoryInput!\n) {\n  createTransactionCategory(input: $input) {\n    node {\n      id\n      name\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3280783a82ddf528c15d51fde74d5dda";

export default node;
