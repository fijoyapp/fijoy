# Design Choices

This is a document that I use to keep track of all the design choices I made,
and I hope this also helps contributors to gain insight on how and why things
are done in the way they are, and please feel free to challenge those design
decisions as certainly they are not perfect :)

## What I want to achieve with Fijoy

There are a couple things I would like to achive with Fijoy

- The account balance is traceable at all time. Meaning if an account has X amount
  of money, it is the sum of all the transactions (`balance_delta` field).
  Everything always adds up at all time.
- A great **semi-auto** net worth tracking experience, I have no interest at the
  moment for providers like Plaid or Flink, as they are quite unreliable
  based on my own testing, and most importantly, I think the habit of logging
  things down manually gives you a better sense of your own financial situation.

---

## Accounts

In the account object, there are a couple fields worth mentioning:

- `symbol`: For cash accounts, this symbol is the currency symbol, for investment
  accounts, this is the ticker symbol.
- `symbol_type`: This tells us whether the symbol is a currency or stock or crypto,
  this influences where we will go fetch the price of the symbol.
- `amount`: The unit of money or share in the account.
- `value`: How much each unit is worth. For money and crypto, it will always be 1.
  For stocks, it will be how much the ticker is worth.
- `fx_rate`: In case this is a foreign currency account, this is the exchange rate
  to the base currency.
- `balance`: The displayed balance of the account, this is calculated
  by `amount * value * fx_rate`.

When creating an account, we will first insert an empty account. Then based on
the initial data provided, we will insert a transaction to record it.

## Transactions

In the transaction object, there are a couple fields worth mentioning:

- `amount`: The amount of money or share after the transaction is done.
- `amount_delta`: The amount of money or share changed in the transaction.
- `value`: This is the new value of each unit.
- `fx_rate`: This is the new fx rate.
- `balance`: This is the new balance of the account after the transaction.
- `balance_delta`: This is the change in balance caused by this transaction.

To create a transaction, we need to fetch the previous transaction
in order to calculate the `amount`, `balance` and `balance_delta` fields.

Every time we create a transaction, we will also update the snapshot (Explained later)!

**Important** things to keep in mind for transactions:

- You can ONLY delete the latest transaction in a given account! You CANNOT
  delete a transaction in the middle of the account history. This restriction
  is placed to ensure a consistent history of each account.

## Snapshot

Snapshots are essentially data points for account balance (`account_snapshot`)
and overall balance (`overall_snapshot`) over time.
This is used to visualize the account balance and total balance by plotting it
on a graph.

For example, assume I made 2 updates to my account, 1st time at 12:23 and 2nd
time at 12:46. The 1st time, a new snapshot row will be inserted in `account_snapshot`
and `overall_snapshot`. The 2nd time, since it is within the same hour, we do not
insert a new row, but we update the existing row.

Every time we add or remove a transaction, we will need to update the snapshot
of that given account and the total balance snapshot.

Snapshot are grouped by hours. We cannot group it by days since that does not play
well when different time zones are involved.
