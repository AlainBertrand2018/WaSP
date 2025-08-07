import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ValidateBusinessIdeaOutput } from '@/ai/flows/business-management/validate-idea-schema';
import type { GenerateMvpOutput } from '@/ai/flows/business-management/generate-mvp-flow';

type FormData = {
    businessIdeaTitle: string;
    ideaDescription: string;
    sector: string;
    sectorTarget: string;
    customerProfile: string;
    productType: string;
    products: { name: string }[];
    startingBudget: string;
    monetization: string;
};

type BusinessIdeaState = {
  analysisResult: ValidateBusinessIdeaOutput | null;
  formData: FormData | null;
  mvpResult: GenerateMvpOutput | null;
  set: (data: Partial<BusinessIdeaState>) => void;
};

export const useBusinessIdeaStore = create<BusinessIdeaState>()(
  persist(
    (set) => ({
      analysisResult: null,
      formData: null,
      mvpResult: null,
      set: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'business-idea-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
