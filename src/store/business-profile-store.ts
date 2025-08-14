
/**
 * @fileOverview Zustand store for managing the global state of the user's business profile.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type BusinessProfile = {
  businessType: string;
  otherBusinessType: string;
  businessForm: string;
  otherBusinessForm: string;
  brn: string;
  isVatRegistered: string;
  vatNumber: string;
  isStartup: boolean;
  annualTurnover: string;
  grossIncome: string;
  projectedAnnualIncomeThreshold: string;
  hasEmployees: string;
  numberOfEmployees: string;
  industry: string;
  businessName: string;
  website: string;
  description: string;
  logo: string;
  mainGoal: string;
  biggestChallenge: string;
};

type BusinessProfileState = {
  profile: BusinessProfile | null;
  setProfile: (profile: BusinessProfile) => void;
  updateProfile: (data: Partial<BusinessProfile>) => void;
  isSaved: boolean;
  setIsSaved: (saved: boolean) => void;
  reset: () => void;
};

const initialState: BusinessProfile = {
  businessType: 'Not set yet',
  otherBusinessType: '',
  businessForm: '',
  otherBusinessForm: '',
  brn: '',
  isVatRegistered: 'No',
  vatNumber: '',
  isStartup: false,
  annualTurnover: '',
  grossIncome: '',
  projectedAnnualIncomeThreshold: '',
  hasEmployees: 'No',
  numberOfEmployees: '',
  industry: '',
  businessName: '',
  website: '',
  description: '',
  logo: '',
  mainGoal: '',
  biggestChallenge: ''
};

export const useBusinessProfileStore = create<BusinessProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isSaved: false,
      setProfile: (profile) => set({ profile, isSaved: true }),
      updateProfile: (data) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...data } : null,
        })),
      setIsSaved: (saved) => set({ isSaved: saved }),
      reset: () => set({ profile: initialState, isSaved: false }),
    }),
    {
      name: 'business-profile-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
