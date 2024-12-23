import { CurrencyStepData, GoalStepData } from "@/types/setup";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currencyStepData: CurrencyStepData | undefined;
  goalStepData: GoalStepData | undefined;
};

type Actions = {
  setCurrencyStepData: (step: CurrencyStepData) => void;
  setGoalStepData: (step: GoalStepData) => void;
  reset: () => void;
};

export const useSetupStore = create<State & Actions>()(
  immer((set) => ({
    currencyStepData: undefined,
    goalStepData: undefined,

    setCurrencyStepData: (step) => {
      set((state) => {
        state.currencyStepData = step;
      });
    },
    setGoalStepData: (step) => {
      set((state) => {
        state.goalStepData = step;
      });
    },

    reset: () =>
      set((state) => {
        state.currencyStepData = undefined;
        state.goalStepData = undefined;
      }),
  })),
);
