
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserState = {
  isHyperAdmin: boolean;
  setHyperAdmin: (isHyperAdmin: boolean) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isHyperAdmin: false,
      setHyperAdmin: (isHyperAdmin) => set({ isHyperAdmin }),
    }),
    {
      name: 'user-auth-status', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
