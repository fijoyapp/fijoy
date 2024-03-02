# Database Design

## Accounts

- Each account will maintain its current balance and the currency.
- Every time when there is a transaction, the balance will be updated accordingly.
- To plot the account balance history, we will do a range query over
  the transaction time of all the transactions for this account.

## Transactions

- Make sure to update the balance of the accounts involved in the transaction.

### Transfer between accounts with different currencies

- Store the exchange rate at the time of the transaction.
  (Get the rate for that date from an external API)
- This exchange rate will be used to convert to the base currency for analysis.

### Transaction Group

I don't think this is necessary.

## Payer / Payee

If this is an income transaction, the payer will be stored, and for an
expense transaction, the payee will be stored. Don't store anything for transfer
since it is between the same person's accounts.
