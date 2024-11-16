// store.ts
import { Api } from "@/api/Api";
import { IUser } from "@/utils/types";
import { create } from "zustand";

interface UserState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
    state: "idle" | "loading";
    fetchUser: (loading: boolean, override?: boolean) => void;

}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,

    setUser: (user) => {
        set({ user });
    },
    clearUser: () => set({ user: null }),
    state: "idle",

    fetchUser: async (loading = true, override = false) => {
        try {
            console.log("fetching user");

            if (loading) set({ state: "loading" });
            const data = await Api.getUser();
            if (data.ok) {
                console.log("fetched user", data.user);

                set({
                    user: data.user,
                });

            }
        } catch (error) {
            console.error(error);
        } finally {
            if (loading) set({ state: "idle" });
        }
    },

}));

