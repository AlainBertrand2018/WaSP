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
  fixedCosts: { [key: string]: number };
  variableCosts: { [key: string]: number };
  totalFixedCosts: number;
  totalVariableCosts: number;
  setFunding: (data: Partial<FundingState>) => void;
  setFixedCost: (name: string, value: number) => void;
  setFixedCosts: (total: number) => void;
  setVariableCost: (name: string, value: number) => void;
  setTotalVariableCosts: (total: number) => void;
  reset: () => void;
};

const initialFundingState: FundingState = {
    requestedAmounts: {},
    interestRate: 7.5,
    loanTerm: 5,
    totalRequested: 0,
    monthlyRepayment: 0,
};

const initialFixedCostsState = {};
const initialVariableCostsState = {};

export const useBudgetPlannerStore = create<BudgetPlannerState>()(
  persist(
    (set) => ({
      funding: initialFundingState,
      fixedCosts: initialFixedCostsState,
      variableCosts: initialVariableCostsState,
      totalFixedCosts: 0,
      totalVariableCosts: 0,
      setFunding: (data) => set((state) => ({ funding: { ...state.funding, ...data } })),
      setFixedCost: (name, value) => set((state) => ({
          fixedCosts: { ...state.fixedCosts, [name]: value }
      })),
      setFixedCosts: (total) => set({ totalFixedCosts: total }),
      setVariableCost: (name, value) => set((state) => ({
        variableCosts: { ...state.variableCosts, [name]: value }
      })),
      setTotalVariableCosts: (total) => set({ totalVariableCosts: total }),
      reset: () => set({ 
          funding: initialFundingState, 
          fixedCosts: initialFixedCostsState, 
          variableCosts: initialVariableCostsState,
          totalFixedCosts: 0,
          totalVariableCosts: 0 
        }),
    }),
    {
      name: 'budget-planner-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
