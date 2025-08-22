import { User } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => {
      return {
        user: null,
        isAuthenticated: false,
        setUser: (user: User) => set({ user, isAuthenticated: true }),
        clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
      };
    },
    {
      name: 'auth-store',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
