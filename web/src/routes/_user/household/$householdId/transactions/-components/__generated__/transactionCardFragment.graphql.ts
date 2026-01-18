/**
 * @generated SignedSource<<419d58eae38793af445c52fa87f1f3bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TransactionCategoryType = "expense" | "income" | "investment" | "setup" | "transfer" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type transactionCardFragment$data = {
  readonly category: {
    readonly icon: string;
    readonly name: string;
    readonly type: TransactionCategoryType;
  };
  readonly datetime: any;
  readonly id: string;
  readonly investmentLots: ReadonlyArray<{
    readonly amount: string;
    readonly id: string;
    readonly investment: {
      readonly currency: {
        readonly code: string;
      };
      readonly name: string;
      readonly symbol: string;
    };
    readonly price: string;
  }> | null | undefined;
  readonly transactionEntries: ReadonlyArray<{
    readonly account: {
      readonly currency: {
        readonly code: string;
      };
      readonly name: string;
    };
    readonly amount: string;
    readonly id: string;
  }> | null | undefined;
  readonly " $fragmentType": "transactionCardFragment";
};
export type transactionCardFragment$key = {
  readonly " $data"?: transactionCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"transactionCardFragment">;
};

const node: ReaderFragment = (function(){
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
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v3 = {
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
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "transactionCardFragment",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "TransactionCategory",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "icon",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "InvestmentLot",
      "kind": "LinkedField",
      "name": "investmentLots",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "price",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Investment",
          "kind": "LinkedField",
          "name": "investment",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "symbol",
              "storageKey": null
            },
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "TransactionEntry",
      "kind": "LinkedField",
      "name": "transactionEntries",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "account",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};
})();

(node as any).hash = "92f90a8e4ed5a126653f01f1d2ba3bdb";

export default node;
