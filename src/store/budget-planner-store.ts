
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GenerateBudgetSummaryOutput } from '@/ai/flows/financials/generate-budget-summary-flow';

export type FundingState = {
  requestedAmounts: { [key: string]: number };
  interestRate: number;
  loanTerm: number;
  totalRequested: number;
  monthlyRepayment: number;
};

export type BudgetSummaryState = {
    totalFixedCosts: number;
    totalVariableCosts: number;
    salePricePerUnit: number;
    funding: FundingState;
    summary: GenerateBudgetSummaryOutput;
}

type BudgetPlannerState = {
  funding: FundingState;
  fixedCosts: { [key: string]: number };
  variableCosts: { [key: string]: number };
  totalFixedCosts: number;
  totalVariableCosts: number;
  salePrice: number;
  summary: GenerateBudgetSummaryOutput | null;
  setFunding: (data: Partial<FundingState>) => void;
  setFixedCost: (name: string, value: number) => void;
  setTotalFixedCosts: (total: number) => void;
  setVariableCost: (name: string, value: number) => void;
  setTotalVariableCosts: (total: number) => void;
  setSalePrice: (price: number) => void;
  setSummary: (summary: GenerateBudgetSummaryOutput | null) => void;
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
      salePrice: 0,
      summary: null,
      setFunding: (data) =>
        set((state) => ({ funding: { ...state.funding, ...data } })),
      setFixedCost: (name, value) =>
        set((state) => ({
          fixedCosts: { ...state.fixedCosts, [name]: value },
        })),
      setTotalFixedCosts: (total) => set({ totalFixedCosts: total }),
      setVariableCost: (name, value) =>
        set((state) => ({
          variableCosts: { ...state.variableCosts, [name]: value },
        })),
      setTotalVariableCosts: (total) => set({ totalVariableCosts: total }),
      setSalePrice: (price) => set({ salePrice: price }),
      setSummary: (summary) => set({ summary }),
      reset: () =>
        set({
          funding: initialFundingState,
          fixedCosts: initialFixedCostsState,
          variableCosts: initialVariableCostsState,
          totalFixedCosts: 0,
          totalVariableCosts: 0,
          salePrice: 0,
          summary: null,
        }),
    }),
    {
      name: 'budget-planner-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
