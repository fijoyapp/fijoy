import { environment } from "@/environment";
import { queryOptions } from "@tanstack/react-query";
import { fetchQuery, graphql } from "relay-runtime";
import { userQuery } from "./__generated__/userQuery.graphql";

const UserQuery = graphql`
  query userQuery {
    user {
      id
    }
  }
`;

export const UserFragment = graphql`
  fragment userFragment on User {
    id
  }
`;

export function userQueryOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: async () => {
      return fetchQuery<userQuery>(environment, UserQuery, {})
        .toPromise()
        .catch((e) => {
          console.error(e);
          return null;
        });
    },
  });
}
