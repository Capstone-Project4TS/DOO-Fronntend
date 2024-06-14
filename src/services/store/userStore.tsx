import { create } from 'zustand';
import { Session } from './types'

interface AuthState {
  session: Session | null;
  getSession: () => Session | null;
  setSession: (newSession: Session) => void;
  deleteSession: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  session: JSON.parse(localStorage.getItem('auth-session') || 'null'),

  getSession: () => {
    const session = JSON.parse(localStorage.getItem('auth-session') || 'null');
    return session;
  },

  setSession: (newSession) => {
    localStorage.setItem('auth-session', JSON.stringify(newSession));
    set({ session: newSession });
  },

  deleteSession: () => {
    localStorage.removeItem('auth-session');
    set({ session: null });
  },
}));

export default useAuthStore;
