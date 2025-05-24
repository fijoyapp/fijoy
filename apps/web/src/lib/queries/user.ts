import { graphql } from "relay-runtime";

export const UserFragment = graphql`
  fragment userFragment on User {
    id
  }
`;
