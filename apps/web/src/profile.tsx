import { createContext, useCallback, useEffect, useState } from "react";
import { Profile } from "./gen/proto/fijoy/v1/profile_pb";
import { ProfileService } from "./gen/proto/fijoy/v1/profile_pb";
import { createClient } from "@connectrpc/connect";
import { useShallow } from "zustand/shallow";
import { finalTransport } from "./lib/connect";
import { useProfileStore } from "./store/profile";

export interface ProfileContext {
  profile: Profile | undefined;
  isLoading: boolean;
  refresh: () => void;
}

const profileClient = createClient(ProfileService, finalTransport);

export const ProfileContext = createContext<ProfileContext | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const { profile, setProfile } = useProfileStore(
    useShallow((state) => ({
      profile: state.profile,
      setProfile: state.setProfile,
    })),
  );

  const refresh = useCallback(() => {
    setIsLoading(true);
    profileClient
      .getProfile({})
      .catch(() => {
        // console.error(error);
      })
      .then((profile) => {
        setProfile(profile || undefined);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileContext.Provider value={{ profile: profile, isLoading, refresh }}>
      {children}
    </ProfileContext.Provider>
  );
}
