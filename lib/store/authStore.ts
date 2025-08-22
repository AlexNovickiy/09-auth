import { User } from '@/types/note';
import { create } from 'zustand';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(set => {
  return {
    user: null,
    isAuthenticated: false,
    setUser: (user: User) => set({ user, isAuthenticated: true }),
    clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
  };
});
