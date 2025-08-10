import { graphql } from "relay-runtime";

export const ProfileFragment = graphql`
  fragment profileFragment on Profile @relay(plural: true) {
    id
    currencies
    locale
    name
    netWorthGoal
  }
`;
