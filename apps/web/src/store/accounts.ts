import {
  CurrencyBalanceStepData,
  NameTypeInstitutionStepData,
} from "@/types/accounts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  nameTypeInstitutionStepData: NameTypeInstitutionStepData | undefined;
  currencyBalanceStepData: CurrencyBalanceStepData | undefined;
};

type Actions = {
  setNameTypeInstitutionStepData: (step: NameTypeInstitutionStepData) => void;
  setCurrencyBalanceStepData: (step: CurrencyBalanceStepData) => void;

  reset: () => void;
};

export const useAccountsStore = create<State & Actions>()(
  immer((set) => ({
    nameTypeInstitutionStepData: undefined,
    currencyBalanceStepData: undefined,
    setNameTypeInstitutionStepData: (step) => {
      set((state) => {
        state.nameTypeInstitutionStepData = step;
      });
    },
    setCurrencyBalanceStepData: (step) => {
      set((state) => {
        state.currencyBalanceStepData = step;
      });
    },

    reset: () => {
      set(() => ({
        nameTypeInstitutionStepData: undefined,
        CurrencyBalanceStepData: undefined,
      }));
    },
  })),
);
