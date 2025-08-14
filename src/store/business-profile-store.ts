
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
  businessType: 'Company',
  otherBusinessType: '',
  businessForm: 'Private Company',
  otherBusinessForm: '',
  brn: 'C12345678',
  isVatRegistered: 'Yes',
  vatNumber: 'VAT27123456',
  isStartup: true,
  annualTurnover: '5000000',
  grossIncome: '4500000',
  projectedAnnualIncomeThreshold: '',
  hasEmployees: 'Yes',
  numberOfEmployees: '5',
  industry: 'Information Technology & BPO',
  businessName: 'Innovatech Solutions Ltd',
  website: 'https://innovatech.mu',
  description: 'A dynamic IT company providing bespoke software solutions and AI consultancy to Mauritian SMEs.',
  logo: '',
  mainGoal: 'increase-sales',
  biggestChallenge: 'Finding qualified talent and navigating the competitive landscape for government tenders.'
};

export const useBusinessProfileStore = create<BusinessProfileState>()(
  persist(
    (set) => ({
      profile: initialState, // Start with pre-filled data
      isSaved: true, // Assume it's "saved" by default for demo
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
