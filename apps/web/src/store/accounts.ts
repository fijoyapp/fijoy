import {
  BalanceStepData,
  InstitutionStepData,
  NameStepData,
  TypeStepData,
} from "@/types/accounts";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  newAccountFormOpen: boolean;

  nameStepData: NameStepData | undefined;
  typeStepData: TypeStepData | undefined;
  institutionStepData: InstitutionStepData | undefined;
  balanceStepData: BalanceStepData | undefined;
};

type Actions = {
  setNewAccountFormOpen: (open: boolean) => void;

  setNameStepData: (step: NameStepData) => void;
  setTypeStepData: (step: TypeStepData) => void;
  setInstitutionStepData: (step: InstitutionStepData) => void;
  setBalanceStepData: (step: BalanceStepData) => void;

  reset: () => void;
};

export const useAccountsStore = create<State & Actions>()(
  immer((set) => ({
    newAccountFormOpen: false,
    setNewAccountFormOpen: (open) => {
      set((state) => {
        state.newAccountFormOpen = open;
      });
    },

    nameStepData: undefined,
    typeStepData: undefined,
    institutionStepData: undefined,
    balanceStepData: undefined,
    setNameStepData: (step) => {
      set((state) => {
        state.nameStepData = step;
      });
    },
    setTypeStepData: (step) => {
      set((state) => {
        state.typeStepData = step;
      });
    },
    setInstitutionStepData: (step) => {
      set((state) => {
        state.institutionStepData = step;
      });
    },
    setBalanceStepData: (step) => {
      set((state) => {
        state.balanceStepData = step;
      });
    },

    reset: () => {
      set(() => ({
        nameStepData: undefined,
        typeStepData: undefined,
        institutionStepData: undefined,
        balanceStepData: undefined,
      }));
    },
  })),
);
