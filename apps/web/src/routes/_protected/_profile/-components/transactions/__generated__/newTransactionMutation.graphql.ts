/**
 * @generated SignedSource<<cd54bdbfa287e0291afe991bf8d8ea94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateTransactionWithTransactionEntriesInput = {
  datetime?: any | null | undefined;
  note?: string | null | undefined;
  transactionEntries: ReadonlyArray<CreateTransactionEntryInput>;
};
export type CreateTransactionEntryInput = {
  accountID: string;
  amount: string;
  transactionID: string;
};
export type newTransactionMutation$variables = {
  input: CreateTransactionWithTransactionEntriesInput;
};
export type newTransactionMutation$data = {
  readonly createTransactionWithTransactionEntries: {
    readonly id: string;
  };
};
export type newTransactionMutation = {
  response: newTransactionMutation$data;
  variables: newTransactionMutation$variables;
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
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "createTransactionWithTransactionEntries",
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
    "name": "newTransactionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newTransactionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eaaa78b8049871c18137743171ba53c2",
    "id": null,
    "metadata": {},
    "name": "newTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation newTransactionMutation(\n  $input: CreateTransactionWithTransactionEntriesInput!\n) {\n  createTransactionWithTransactionEntries(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a1e9cefd77417f370233db8a95d3fe1b";

export default node;
