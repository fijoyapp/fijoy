import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  newAccountFormOpen: boolean;
};

type Actions = {
  setNewAccountFormOpen: (open: boolean) => void;
};

export const useAccountsStore = create<State & Actions>()(
  immer((set) => ({
    newAccountFormOpen: false,
    setNewAccountFormOpen: (open) => {
      set((state) => {
        state.newAccountFormOpen = open;
      });
    },
  })),
);
