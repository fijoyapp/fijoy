import { CurrencyStepData } from "@/types/setup";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currencyStepData: CurrencyStepData | undefined;
};

type Actions = {
  setCurrencyStepData: (step: CurrencyStepData) => void;
  reset: () => void;
};

export const useSetupStore = create<State & Actions>()(
  immer((set) => ({
    currencyStepData: undefined,

    setCurrencyStepData: (step) => {
      set((state) => {
        state.currencyStepData = step;
      });
    },

    reset: () =>
      set((state) => {
        state.currencyStepData = undefined;
      }),
  })),
);
