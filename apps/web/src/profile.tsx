import { createContext } from "react";
import { fetchQuery, graphql } from "relay-runtime";
import { useQuery } from "@tanstack/react-query";
import { profileQuery } from "./__generated__/profileQuery.graphql";
import { environment } from "./environment";

export interface ProfileContext {
  profile: profileQuery["response"]["profile"] | undefined;
  isLoading: boolean;
}

const ProfileQuery = graphql`
  query profileQuery {
    profile {
      id
    }
  }
`;

export const ProfileContext = createContext<ProfileContext | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return fetchQuery<profileQuery>(environment, ProfileQuery, {})
        .toPromise()
        .catch(() => null);
    },
  });

  return (
    <ProfileContext.Provider value={{ profile: data?.profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}
