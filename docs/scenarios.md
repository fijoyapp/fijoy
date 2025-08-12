# Scenarios

There are some difficult scenarios that require careful considerations and we
need to balance all potential trade-offs, especially in terms of the schema design.

## Switch Main Currency

Ideally the switch cost should be "O(1)", without having to update all previous data.

One way to achieve this is, we create a "currency profile" for each currency
that user adds, thus the user does not have a single source of truth for the currency.

## Display Net Worth History Over Time

We will go with a manual snapshot approach. User will snapshot points manually
and we can just store them in a table. While the user performs the snapshot,
they can also create a note which can be anything, could be good memory.

## Update/Delete Older Transactions

Immutable still.

## Display Individual Account History Over Time

Should be included as a part of the snapshot. Snapshot every account.

## Transfer Between Accounts with Different Currencies

Transaction entries!

## Stock Split

It's okay just let the user apply the edit.
