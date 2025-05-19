import { environment } from "@/environment";
import { queryOptions } from "@tanstack/react-query";
import { fetchQuery, graphql } from "relay-runtime";
import { profileQuery } from "./__generated__/profileQuery.graphql";

const ProfileQuery = graphql`
  query profileQuery {
    profiles {
      id
      currencies
      locale
      netWorthGoal
    }
  }
`;

export const ProfileFragment = graphql`
  fragment profileFragment on Profile @relay(plural: true) {
    id
    currencies
    locale
    netWorthGoal
  }
`;

export function profileQueryOptions() {
  return queryOptions({
    queryKey: ["profile"],
    queryFn: async () => {
      return fetchQuery<profileQuery>(environment, ProfileQuery, {})
        .toPromise()
        .catch(() => null);
    },
  });
}
