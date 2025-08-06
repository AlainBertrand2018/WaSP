import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FundingState = {
    requestedAmounts: { [key: string]: number };
    interestRate: number;
    loanTerm: number;
    totalRequested: number;
    monthlyRepayment: number;
};

type BudgetPlannerState = {
  funding: FundingState;
  setFunding: (data: Partial<FundingState>) => void;
  reset: () => void;
};

const initialFundingState: FundingState = {
    requestedAmounts: {},
    interestRate: 7.5,
    loanTerm: 5,
    totalRequested: 0,
    monthlyRepayment: 0,
};

export const useBudgetPlannerStore = create<BudgetPlannerState>()(
  persist(
    (set) => ({
      funding: initialFundingState,
      setFunding: (data) => set((state) => ({ funding: { ...state.funding, ...data } })),
      reset: () => set({ funding: initialFundingState }),
    }),
    {
      name: 'budget-planner-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
