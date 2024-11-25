import { Profile } from "@/gen/proto/fijoy/v1/profile_pb";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  profile: Profile | undefined;
};

type Actions = {
  setProfile: (profile: Profile | undefined) => void;
  reset: () => void;
};

export const useProfileStore = create<State & Actions>()(
  immer((set) => ({
    profile: undefined,

    setProfile: (profile) => {
      set((state) => {
        state.profile = profile;
      });
    },

    reset: () =>
      set((state) => {
        state.profile = undefined;
      }),
  })),
);
