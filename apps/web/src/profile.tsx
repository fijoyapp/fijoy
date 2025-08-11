import { createContext } from "react";
import { graphql, useFragment } from "react-relay";
import type {
  profilesFragment$data,
  profilesFragment$key,
} from "./lib/queries/__generated__/profilesFragment.graphql";
import type {
  profileFragment$data,
  profileFragment$key,
} from "./__generated__/profileFragment.graphql";

export interface ProfileContext {
  profile: profileFragment$data["profile"];
  defaultCurrency: string;
  profileRef: profileFragment$key;
  profiles: profilesFragment$data;
  profilesRef: profilesFragment$key;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext<ProfileContext | null>(null);

const fragment = graphql`
  fragment profileFragment on Query {
    profile {
      # eslint-disable-next-line relay/unused-fields
      id
      # eslint-disable-next-line relay/unused-fields
      name
      currencies
      # eslint-disable-next-line relay/unused-fields
      netWorthGoal
      locale
    }
  }
`;

export function ProfileProvider({
  children,
  profileRef,
  profiles,
  profilesRef,
}: {
  children: React.ReactNode;
  profileRef: profileFragment$key;
  profiles: profilesFragment$data;
  profilesRef: profilesFragment$key;
}) {
  const data = useFragment(fragment, profileRef);

  return (
    <ProfileContext.Provider
      value={{
        profile: data.profile,
        profileRef,
        profiles,
        profilesRef,
        defaultCurrency: data.profile.currencies[0],
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
