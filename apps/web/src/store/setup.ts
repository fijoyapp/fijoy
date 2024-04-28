import { CurrencyLocaleStepData, NameNamespaceStepData } from "@/types/setup";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  nameNamespaceStepData: NameNamespaceStepData | undefined;
  currencyLocaleStepData: CurrencyLocaleStepData | undefined;
};

type Actions = {
  setNameNamespaceStepData: (step: NameNamespaceStepData) => void;
  setCurrencyLocaleStepData: (step: CurrencyLocaleStepData) => void;
  reset: () => void;
};

export const useSetupStore = create<State & Actions>()(
  immer((set) => ({
    nameNamespaceStepData: undefined,
    currencyLocaleStepData: undefined,

    setNameNamespaceStepData: (step) => {
      set((state) => {
        state.nameNamespaceStepData = step;
      });
    },
    setCurrencyLocaleStepData: (step) => {
      set((state) => {
        state.currencyLocaleStepData = step;
      });
    },

    reset: () =>
      set((state) => {
        state.nameNamespaceStepData = undefined;
        state.currencyLocaleStepData = undefined;
      }),
  })),
);
