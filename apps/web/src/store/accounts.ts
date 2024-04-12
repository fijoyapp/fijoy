import { BalanceStepData, NameTypeInstitutionStepData } from "@/types/accounts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  nameTypeInstitutionStepData: NameTypeInstitutionStepData | undefined;
  balanceStepData: BalanceStepData | undefined;
};

type Actions = {
  setNameTypeInstitutionStepData: (step: NameTypeInstitutionStepData) => void;
  setBalanceStepData: (step: BalanceStepData) => void;

  reset: () => void;
};

export const useAccountsStore = create<State & Actions>()(
  immer((set) => ({
    nameTypeInstitutionStepData: undefined,
    balanceStepData: undefined,
    setNameTypeInstitutionStepData: (step) => {
      set((state) => {
        state.nameTypeInstitutionStepData = step;
      });
    },
    setBalanceStepData: (step) => {
      set((state) => {
        state.balanceStepData = step;
      });
    },

    reset: () => {
      set(() => ({
        nameTypeInstitutionStepData: undefined,
        balanceStepData: undefined,
      }));
    },
  })),
);
