import { create } from "zustand";


interface AuthState {
    loading: boolean
    authenticated: boolean
    setLoading: (loading: boolean) => void
    setAuthenticated: (authenticated: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    loading: true,
    authenticated: false,
    setLoading: (loading) => set({ loading }),
    setAuthenticated: (authenticated) => set({ authenticated }),
}))