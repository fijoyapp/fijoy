import { graphql } from "relay-runtime";

export const CardFragment = graphql`
  fragment cardFragment on Account {
    id
    name
    balance
    accountType
    symbol
    updatedAt
  }
`;
