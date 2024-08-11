import { CurrencyLocaleStepData } from "@/types/setup";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currencyLocaleStepData: CurrencyLocaleStepData | undefined;
};

type Actions = {
  setCurrencyLocaleStepData: (step: CurrencyLocaleStepData) => void;
  reset: () => void;
};

export const useSetupStore = create<State & Actions>()(
  immer((set) => ({
    currencyLocaleStepData: undefined,

    setCurrencyLocaleStepData: (step) => {
      set((state) => {
        state.currencyLocaleStepData = step;
      });
    },

    reset: () =>
      set((state) => {
        state.currencyLocaleStepData = undefined;
      }),
  })),
);
