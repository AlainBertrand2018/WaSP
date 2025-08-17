
/**
 * @fileOverview Zustand store for managing the user's multiple business profiles.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Matches the structure of the business_profiles table in Supabase
export type BusinessProfile = {
  id: string; // uuid
  user_id: string; // uuid from auth.users
  business_type: string;
  other_business_type?: string;
  business_form?: string;
  other_business_form?: string;
  brn?: string;
  is_vat_registered: boolean;
  vat_number?: string;
  is_startup: boolean;
  annual_turnover?: string;
  gross_income?: string;
  projected_annual_income_threshold?: string;
  has_employees: boolean;
  number_of_employees?: number;
  industry?: string;
  business_name: string;
  website?: string;
  description?: string;
  logo_url?: string;
  main_goal?: string;
  biggest_challenge?: string;
  created_at: string; // timestamptz
};

type BusinessProfileState = {
  profiles: BusinessProfile[];
  activeProfile: BusinessProfile | null;
  setProfiles: (profiles: BusinessProfile[]) => void;
  addProfile: (profile: BusinessProfile) => void;
  updateProfile: (profile: BusinessProfile) => void;
  setActiveProfile: (profile: BusinessProfile | null) => void;
  reset: () => void;
};

export const useBusinessProfileStore = create<BusinessProfileState>()(
  persist(
    (set) => ({
      profiles: [],
      activeProfile: null,
      setProfiles: (profiles) => set({ profiles }),
      addProfile: (profile) => set((state) => ({ profiles: [...state.profiles, profile] })),
      updateProfile: (profile) => set((state) => ({
          profiles: state.profiles.map((p) => p.id === profile.id ? profile : p),
          // Also update the active profile if it's the one being edited
          activeProfile: state.activeProfile?.id === profile.id ? profile : state.activeProfile,
      })),
      setActiveProfile: (profile) => set({ activeProfile: profile }),
      reset: () => set({ profiles: [], activeProfile: null }),
    }),
    {
      name: 'business-profile-storage-v2', // New name to avoid conflicts with old structure
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
