import { graphql } from "relay-runtime";

export const CardFragment = graphql`
  fragment cardFragment on Account {
    id
    name
    value
    amount
    balance
    accountType
    ticker
    tickerType
    currencySymbol
    updatedAt
  }
`;
