import { CurrencyStepData, GeneralStepData } from "@/types/setup";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  generalStepData: GeneralStepData | undefined;
  currencyStepData: CurrencyStepData | undefined;
};

type Actions = {
  setGeneralStepData: (step: GeneralStepData) => void;
  setCurrencyStepData: (step: CurrencyStepData) => void;
  reset: () => void;
};

export const useSetupStore = create<State & Actions>()(
  immer((set) => ({
    generalStepData: undefined,
    currencyStepData: undefined,

    setGeneralStepData: (step) => {
      set((state) => {
        state.generalStepData = step;
      });
    },
    setCurrencyStepData: (step) => {
      set((state) => {
        state.currencyStepData = step;
      });
    },

    reset: () => {
      set(() => ({
        generalStepData: undefined,
        currencyStepData: undefined,
      }));
    },
  })),
);
