# Design Choices

This is a document that I use to keep track of all the design choices I made,
and I hope this also helps contributors to gain insight on how and why things
are done in the way they are, and please feel free to challenge those design
decisions as certainly they are not perfect :)

## What I want to achieve with Fijoy

A great **semi-auto** net worth tracking experience.

### What do I mean by semi-auto?

#### Manual

Transactions such as making a purchase, receiving a paycheck, transfer
between accounts, buy/sell shares of a given stock will be logged manually.

I have no interest at the moment to use data aggregators like Plaid or Flink to
log these transactions automatically as they are quite unreliable and
not easy to maintain with just myself alone. And most importantly, I think
the habit of logging your transactions down manually gives you a better sense
of your own financial situation.

#### Auto

Once Fijoy knows how much shares of a given stock you own, the total value of
your portfolio can be calculated automatically by fetching the latest price.

We will also handle all your foreign currency account and display your net
worth in the default currency you set.

TLDR: everything related to asset price and foreign exchange rate will be handled
automatically. You will just make sure to manually log your transactions down!

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

When creating an account, we will first insert an empty account with the correct
`value` and `fx_rate`. Then based on the initial data provided,
we will insert a transaction to record the initial `amount`.

## Transactions

In the transaction object, there are a couple fields worth mentioning:

- `amount`: The amount of money or share this transaction added or removed
- `value`: This field is only used for investment, this is essentially the price

Every time we create a transaction, we will also update the account balance.
