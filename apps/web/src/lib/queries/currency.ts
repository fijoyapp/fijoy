import { graphql } from "relay-runtime";

export const CurrencyFragment = graphql`
  fragment currencyFragment on Currency @relay(plural: true) {
    code
    locale
  }
`;
